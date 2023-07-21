from database import get_database

def get_users_collection():
    database = get_database()
    users_collection = database["users"]
    return users_collection

def create_user(user_data):
    users_collection = get_users_collection()
    user = users_collection.insert_one(user_data)
    return user.inserted_id


def get_properties_collection():
    database = get_database()
    properties_collection = database["properties"]
    return properties_collection

def create_property(property_data):
    properties_collection = get_properties_collection()
    property_id = properties_collection.insert_one(property_data)
    return property_id.inserted_id

def get_bookings_collection():
    database = get_database()
    bookings_collection = database["bookings"]
    return bookings_collection

def create_booking(booking_data):
    bookings_collection = get_bookings_collection()
    booking_id = bookings_collection.insert_one(booking_data).inserted_id
    return booking_id