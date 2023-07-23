from flask import Flask, render_template, request, jsonify
from jwt import encode, decode, InvalidTokenError
from bson import ObjectId

from models import create_user, get_users_collection, create_property, get_properties_collection,get_bookings_collection,create_booking

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users_collection = get_users_collection()

def generate_token(user_id):
    # Replace <YOUR_SECRET_KEY> with your actual secret key for token encoding
    token = encode({'user_id': user_id}, 'hrsht', algorithm='HS256')
    return token


@app.route('/')
def home():
    return "Welcome to Homestead Horizon"


@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.get_json()
    user_id = create_user(user_data)
    return jsonify({'message': f'User created with ID: {user_id}'}), 200


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = users_collection.find_one({'email': email, 'password': password})

    if user:
        user_id = str(user['_id'])
        token = generate_token(user_id)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


@app.route('/addProperty', methods=['POST'])
def add_property():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        host_id = decoded_token['user_id']

        # Retrieve user information or perform any additional validation as needed
        users_collection = get_users_collection()
        user = users_collection.find_one({'_id': ObjectId(host_id)})

        if not user or user.get('role') != 'host':
            return jsonify({'message': 'You are not authorized to add a property'}), 403

        # Extract property details from the request
        property_data = {
            'host_id': host_id,
            'location': request.json.get('location'),
            'property_type': request.json.get('property_type'),
            'about': request.json.get('about'),
            'hosting_since': request.json.get('hosting_since')
        }

        # Create the property in the properties collection
        properties_collection = get_properties_collection()
        property_id = properties_collection.insert_one(property_data).inserted_id

        return jsonify({'message': 'Property added successfully', 'property_id': str(property_id)}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


@app.route('/getProperty', methods=['GET'])
def get_properties():
    # token = request.headers.get('Authorization')

    # if not token:
    #     return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        # decoded_token = decode(token, 'hrsht', algorithms=['HS256'])

        # Retrieve all available properties
        properties_collection = get_properties_collection()
        properties = list(properties_collection.find({}))

        # Remove the _id field from each property (optional)
        for property in properties:
            property.pop('_id', None)

        return jsonify({'properties': properties}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401



@app.route('/updateProperty/<property_id>', methods=['PUT'])
def update_property(property_id):
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        host_id = decoded_token['user_id']

        # Retrieve user information or perform any additional validation as needed
        users_collection = get_users_collection()
        user = users_collection.find_one({'_id': ObjectId(host_id)})

        if not user or user.get('role') != 'host':
            return jsonify({'message': 'You are not authorized to update a property'}), 403

        # Check if the property belongs to the host
        properties_collection = get_properties_collection()
        property = properties_collection.find_one({'_id': ObjectId(property_id), 'host_id': host_id})

        if not property:
            return jsonify({'message': 'Property not found or does not belong to the host'}), 404

        # Update the property
        property_data = request.get_json()
        properties_collection.update_one({'_id': ObjectId(property_id)}, {'$set': property_data})

        return jsonify({'message': 'Property updated successfully'}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


@app.route('/deleteProperty/<property_id>', methods=['DELETE'])
def delete_property(property_id):
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        host_id = decoded_token['user_id']

        # Retrieve user information or perform any additional validation as needed
        users_collection = get_users_collection()
        user = users_collection.find_one({'_id': ObjectId(host_id)})

        if not user or user.get('role') != 'host':
            return jsonify({'message': 'You are not authorized to delete a property'}), 403

        # Check if the property belongs to the host
        properties_collection = get_properties_collection()
        property = properties_collection.find_one({'_id': ObjectId(property_id), 'host_id': host_id})

        if not property:
            return jsonify({'message': 'Property not found or does not belong to the host'}), 404

        # Delete the property
        properties_collection.delete_one({'_id': ObjectId(property_id)})

        return jsonify({'message': 'Property deleted successfully'}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


@app.route('/updateUser', methods=['PUT'])
def update_user():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        user_id = decoded_token['user_id']

        # Retrieve user information or perform any additional validation as needed
        users_collection = get_users_collection()
        user = users_collection.find_one({'_id': ObjectId(user_id)})

        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Update the user
        user_data = request.get_json()
        users_collection.update_one({'_id': ObjectId(user_id)}, {'$set': user_data})

        return jsonify({'message': 'User updated successfully'}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


@app.route('/book/<property_id>', methods=['POST'])
def book_property(property_id):
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        user_id = decoded_token['user_id']

        # Retrieve user information or perform any additional validation as needed
        users_collection = get_users_collection()
        user = users_collection.find_one({'_id': ObjectId(user_id)})

        if not user:
            return jsonify({'message': 'User not found'}), 404

        role = user.get('role')
        if role and role != 'guest' and 'role' in user:
            return jsonify({'message': 'You are not authorized to book a property'}), 403

        # Check if the property exists
        properties_collection = get_properties_collection()
        property = properties_collection.find_one({'_id': ObjectId(property_id)})

        if not property:
            return jsonify({'message': 'Property not found'}), 404

        # Book the property
        bookings_collection = get_bookings_collection()
        booking_data = {
            'property_id': property_id,
            'guest_id': user_id
        }
        booking_id = bookings_collection.insert_one(booking_data).inserted_id

        # Fetch the booked property details
        booked_property = properties_collection.find_one({'_id': ObjectId(property_id)})

        return jsonify({'message': 'Property booked successfully', 'booking_id': str(booking_id), 'booked_property': booked_property}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


@app.route('/getbooking', methods=['GET'])
def get_bookings_and_properties():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Authorization token is missing'}), 401

    try:
        decoded_token = decode(token, 'hrsht', algorithms=['HS256'])
        user_id = decoded_token['user_id']

        # Retrieve bookings with matching guest_id
        bookings_collection = get_bookings_collection()
        bookings = list(bookings_collection.find({'guest_id': user_id}))

        # Extract property IDs from bookings
        property_ids = [booking['property_id'] for booking in bookings]

        # Fetch properties with matching IDs
        properties_collection = get_properties_collection()
        properties = list(properties_collection.find({'_id': {'$in': [ObjectId(id) for id in property_ids]}}))

        # Remove the _id field from each property (optional)
        for property in properties:
            property.pop('_id', None)

        return jsonify({'properties': properties}), 200

    except InvalidTokenError:
        return jsonify({'message': 'Invalid authorization token'}), 401


if __name__ == '__main__':
    app.run(debug=True)
