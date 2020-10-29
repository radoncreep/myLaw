let str = `Bearer  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Zjk4MTY3MzA2Y2U2NTMyYjAzY2Q5YzkiLCJlbWFpbCI6InZpY3RvcnN0YXJrQGluYy5jb20iLCJpYXQiOjE2MDM5Nzg3MzQsImV4cCI6MTYwMzk4MjMzNH0.kb6Cvla6qNR2R1rovEgQ_1uupVP4zgb1wme6iirdP1E" `;


let arr = str.split('.')[0].split('  ')[1]



console.log(arr)
