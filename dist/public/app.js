var data = null;

// Define the fetchData function
const fetchData = async function () {
  try {
    // Fetch the data from the JSON file
    const response = await fetch("./bangladesh.json");

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    return await response.json();
  } catch (error) {
    // Handle any errors that occur during fetching or parsing
    console.error("Error fetching data:", error);
    // You may choose to return a default value or handle the error differently
    return null;
  }
};

// Call fetchData function
fetchData()
  .then((result) => {
    data = result;
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors occurred during fetchData
    console.error(error);
  });

console.table(data);
