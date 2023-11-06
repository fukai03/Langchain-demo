from flask import Flask, request, jsonify  
from langchain_wenxin.chat_models import ChatWenxin
from langchain.schema.messages import HumanMessage
  
app = Flask(__name__)  

llm = ChatWenxin()
# print(llm([HumanMessage(content="你好")]))
  
@app.route('/api/persons', methods=['POST'])  
def create_person():  
    data = request.get_json()  
    person_name = data.get('name')  
    person_age = data.get('age')  
    if person_name and person_age:  
        person = {  
            'name': person_name,  
            'age': person_age  
        }  
        return jsonify({'person': person}), 201  
    else:  
        return jsonify({'error': 'Missing name or age'}), 400  
    
@app.route('/api/chat', methods=['POST'])
def create_chat():
    data = request.get_json()
    message = data.get('message')
    if message:
        chatAnswer = llm([HumanMessage(content=message)])
        return {'message': chatAnswer.content}, 201
    else:
        return jsonify({'error': 'Missing message'}), 400
  
@app.route('/api/persons', methods=['GET'])  
def get_persons():  
    persons = [  
        {'name': 'John', 'age': 30},  
        {'name': 'Jane', 'age': 28},  
        # 在此处添加更多人员信息...  
    ]  
    return jsonify({'persons': persons})  


  
if __name__ == '__main__':  
    app.run(debug=True)