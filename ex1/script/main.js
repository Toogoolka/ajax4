const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const studentsDom = parser.parseFromString(xmlString, "text/xml");

const students = studentsDom.querySelectorAll("student");

for (const student of students) {
    const firstNameNode = student.querySelector("first");
    const secondNameNode = student.querySelector("second");
    const ageNode = student.querySelector("age");
    const profNode = student.querySelector("prof");
    const nameNode = student.querySelector("name");
    const langAttr = nameNode.getAttribute("lang");

    const result = {
        name: firstNameNode.textContent + " " + secondNameNode.textContent,
        age: ageNode.textContent,
        prof: profNode.textContent,
        lang: langAttr,
    }
    console.log("Студент:", result);
}
