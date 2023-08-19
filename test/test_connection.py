import pytest
import app
import   

# Test if the server starts correctly
def test_server_start():
    client = app.app.test_client()
    response = client.get('/')
    assert response.status_code == 200

# Test the balance endpoint with a dummy address
def test_balance_endpoint():
    client = app.app.test_client()
    response = client.get('/balance/0xcee2d95bb0b7dc864444a92d50e37107ebc6db53')
    assert response.status_code == 200
    # You can add more assertions based on expected response content

# Add more tests as needed...
