document.addEventListener('DOMContentLoaded', function () {
  divisionRender()

  // on filter
  handleDivisionSelection()
  handleDistrictSelection()

  // donor form
  handleDonorInsertForm()
})

// fetch division
async function fetchData(url) {
  try {
    const data = await fetch(url).then((res) => {
      if (res.ok) return res.json()
    })

    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

// render selection option
function renderSelectionOption(data, targetDOM) {
  if (Array.isArray(data) && data.length) {
    data.map((d) => {
      const option = document.createElement('option')
      option.value = d.id
      option.textContent = d.en_name
      targetDOM.append(option)
    })
  } else {
    const option = document.createElement('option')
    option.value = '#'
    option.textContent = 'Data not found'
    option.setAttribute('disabled', true)
    targetDOM.append(option)
  }
}

// fetch division and render to divisions selection options
async function divisionRender() {
  // fetch divisions
  const fetch = await fetchData('/api/divisions')
  const divisions = fetch.data

  // get container element
  const divisionSelectElement = document.querySelector('#division')
  divisionSelectElement.innerHTML = `<option value="#" selected disabled>Select division</option>`

  renderSelectionOption(divisions, divisionSelectElement)
}

// fetch district and render to district selection options
async function districtRender(divisionId) {
  // get container element
  const districtSelectElement = document.querySelector('#district')
  districtSelectElement.innerHTML = `
    <option value="#" selected disabled>Select district</option>
    <option value="loading" disabled>Loading...</option>
  `

  // fetch districts
  const fetch = await fetchData(`/api/district/division/${divisionId}`)
  const districts = fetch.data

  districtSelectElement.innerHTML = `
    <option value="#" selected disabled>Select district</option>
  `

  renderSelectionOption(districts, districtSelectElement)
}

// fetch thana and render to thana selection options
async function thanaRender(districtId) {
  // get container element
  const thanaSelectElement = document.querySelector('#thana')
  thanaSelectElement.innerHTML = `
    <option value="#" selected disabled>Select thana</option>
    <option value="loading" disabled>Loading...</option>
  `
  // fetch thana
  const fetch = await fetchData(`/api/thana/district/${districtId}`)
  const thana = fetch.data

  thanaSelectElement.innerHTML = `
    <option value="#" selected disabled>Select thana</option>
  `

  renderSelectionOption(thana, thanaSelectElement)
}

// division on select fetch district data and render to district selection menu
function handleDivisionSelection() {
  const divisionSelectElement = document.querySelector('#division')
  divisionSelectElement.addEventListener('change', async function (event) {
    await districtRender(event.target.value)
  })
}

// district on select fetch thana data and render to thana selection menu
function handleDistrictSelection() {
  const districtSelectElement = document.querySelector('#district')
  districtSelectElement.addEventListener('change', async function (event) {
    await thanaRender(event.target.value)
  })
}

// add donor
function handleDonorInsertForm() {
  const donorRegForm = document.querySelector('#donor-registration')

  donorRegForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    try {
      const formData = new FormData(event.target)

      const res = await fetch('/api/donor', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error(
          'Failed to submit form. Server responded with status ' + res.status,
        )
      }

      const data = await res.json()
      console.log(data) // Log response data if needed
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle the error, display a message to the user, etc.
    }
  })
}
