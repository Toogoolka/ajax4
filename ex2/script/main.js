const jsonString =` 
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
  ]
}`

const data = JSON.parse(jsonString);
const list = data.list;
for (const item of list) {
    const result = {
        name: item.name,
        age: item.age,
        prof: item.prof,
    };
    console.log('result', result)
}