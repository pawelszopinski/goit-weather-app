import { API_KEY } from "./config";

const dataEl = document.getElementById("data");
const searchButtonEl = document.getElementById("search");
const searchInputEl = document.getElementById("search-input");
const errorMessageEl = document.getElementById("error-message");
const tableContentEl = document.getElementById("table-content");
const tableDataEl = document.getElementById("table-data");

function getWeatherData(city) {
  errorMessageEl.textContent = "";
  dataEl.textContent = "";

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorMessageEl.textContent = data.error.message;
      } else {
        dataEl.textContent = JSON.stringify(data, null, 2);
        // dataEl.textContent = data.current.temp_c;

        let content = "";
        for (const [key, value] of Object.entries(data.location)) {
          content += `
            <tr>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${key[0].toUpperCase()}${key
            .slice(1)
            .replaceAll("_", " ")}</td>
                <td class="px-6 py-4">${value}</td>
            </tr>
          `;
        }

        tableContentEl.innerHTML = content;
        tableDataEl.classList.remove("hidden");
      }
    })
    .catch(() => {
      console.log("API NIE DZIAŁA!!!!");
    });
}

searchButtonEl.addEventListener("click", () => {
  const city = searchInputEl.value;

  getWeatherData(city);
});
