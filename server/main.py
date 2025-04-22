from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import uvicorn
import numpy as np        
from sklearn.linear_model import LinearRegression

# Load your trained Linear Regression model
model = joblib.load('linear_regression_model.pkl')  # Change the path if needed

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["http://localhost:3000"] for specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data schema
class PredictionInput(BaseModel):
    productLine: str    
    priceEach: float
    msrp: int    
    month_id: int    

@app.get("/")
def getData():
    return {"message":"hi"}


@app.get("/data")
def fetchData():
    with open("dataset.csv","rb") as f:
        data = pd.read_csv(f,encoding='ISO-8859-1')
        data['INVENTORY_VALUE'] = data['QUANTITYORDERED'] * data['PRICEEACH']

        # Total value of all inventory sold
        total_inventory_value = data['INVENTORY_VALUE'].sum()

        unique_skus = data['PRODUCTCODE'].nunique()

        top_products_info = data.groupby(['PRODUCTLINE'])['QUANTITYORDERED'].sum().reset_index()
        top_products_info = top_products_info.sort_values(by='QUANTITYORDERED', ascending=False)        
    
        return {
            "total_inventory":f"{total_inventory_value:.2f}",
            "skus":unique_skus,                     
        }

# Define prediction endpoint
@app.post("/predict")
def predict(data: PredictionInput):

    with open("model_columns.pkl", "rb") as f:
        model_columns = joblib.load(f)
        # Convert input to DataFrame
        input_df = pd.DataFrame([{
            'PRODUCTLINE': data.productLine,        
            'PRICEEACH': data.priceEach,
            'MSRP': data.msrp,        
            'MONTH_ID': data.month_id,        
        }])

        input_df = pd.get_dummies(input_df[['PRODUCTLINE', 'PRICEEACH', 'MSRP', 'MONTH_ID']], columns=['PRODUCTLINE'])
        user_input_df = input_df.reindex(columns=model_columns, fill_value=0)
        

        # Predict
        prediction = model.predict(user_input_df)[0]

        return {"predicted_sales": f"{prediction:.2f}"}

