from pymongo import MongoClient

def get_database():
    # Replace <YOUR_CONNECTION_STRING> with your actual MongoDB Atlas connection string
    client = MongoClient("mongodb+srv://harshit:sahu@cluster0.pylf6yp.mongodb.net/?retryWrites=true&w=majority")
    database = client["hotelhunt"]
    return database
