const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

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
  const input = document.getElementById('destinationInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  fetch('travel_recommendation_api.json').then(response => response.json())
  .then(data => {
    const destination = data.countries.find(item => item.name.toLowerCase() === input);
    if (destination) {
      html = '';
      destination.cities.forEach(city => {
        html += `<img src="${city.imageUrl}" alt="City">`;
        html += `<p><strong>${city.name}</strong></p>`;
        html += `<p>${city.description}</p>`;
      });
      resultDiv.innerHTML = html;
    } else {
      console.log("Buscando templos", input);
      const destination = data.temples.find(item => item.name.toLowerCase() === input);
      if (destination) {
        html = `<img src="${destination.imageUrl}" alt="City">`;
        html += `<p><strong>${destination.name}</strong></p>`;
        html += `<p>${destinatio+n.description}</p>`;
        resultDiv.innerHTML = html;
      } else {
        console.log("Buscando playas", input);
        let destination = null;
        data.beaches.forEach(beach => {
          if (beach.name.toLowerCase().includes(input)) {
            destination = beach;
            console.log("Playas", destination.name);
          }
        });
        if (destination) {
          html = `<img src="${destination.imageUrl}" alt="City">`;
          html += `<p><strong>${destination.name}</strong></p>`;
          html += `<p>${destination.description}</p>`;
          resultDiv.innerHTML = html;
        } else {
          resultDiv.innerHTML = 'Destination not found.';
        }
      }
    }
  })
  .catch(error=> {
    console.error('An error:', error);
  });
}
btnSearch.addEventListener('click', findDestination);

function clear() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";
}
btnClear.addEventListener('click', clear);
