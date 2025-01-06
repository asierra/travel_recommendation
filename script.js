const searchButton = document.getElementById("btnSearch");
const clearButton = document.getElementById("btnClear");

function loadPartial(url) {
  content = fetch(url).then(function (response) {
      return response.text();
    }).then(function(htmlpartial) {
      const container = document.getElementById("main");
      container.innerHTML = htmlpartial;
    })
    .catch(error=> {
      console.error('An error:', error);
    });
}

function findDestination(keyword) {
    const foundEmployee = employees.find(employee => employee.id === employeeId);
    if (foundEmployee) {
    document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
    }
    else{
      document.getElementById('employeesDetails').innerHTML = 'no employee has been found with this ID';

    }
}
