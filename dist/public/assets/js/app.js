document.addEventListener('DOMContentLoaded', function () {
  divisionRender()
  fetchDonor()

  // on filter
  handleDivisionSelection()
  handleDistrictSelection()
  handleThanaSelection()

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

// fetch donors
async function fetchDonor() {
  const targetDOM = document.querySelector('#donor-list')
  targetDOM.innerHTML = `
          <div class="donor-card">
              <div class="data-loading">
                <span>Loading...</spa>
              </div>
            </div>`

  // filter data
  const filterBar = document.querySelector('#donor-filter-option')
  if (filterBar) {
    const division = filterBar.querySelector('div > select#division').value
    const district = filterBar.querySelector('div > select#district').value
    const thana = filterBar.querySelector('div > select#thana').value

    function removeEmpty(obj) {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value && value !== '#'),
      )
    }
    // make query string
    const queryObj = removeEmpty({
      division,
      district,
      thana,
    })

    const queryString = new URLSearchParams(queryObj).toString()

    // fetch donors
    const data = await fetch(`/api/donors?${queryString}`)
    if (data.ok) {
      const donorJson = await data.json()
      const donor = donorJson.data

      renderDonor(donor)
    }
  }
}

// render donor
function renderDonor(donor) {
  const targetDOM = document.querySelector('#donor-list')
  if (donor && Array.isArray(donor) && donor.length) {
    // target DOM
    targetDOM.innerHTML = ''

    donor.map((data) => {
      // donor card
      const donorCard = document.createElement('div')
      donorCard.classList.add('donor-card')

      const userIcon = document.createElement('i')
      userIcon.classList.add('fa-solid')
      userIcon.classList.add('fa-user')

      // donor name
      const donorName = document.createElement('h4')
      donorName.classList.add('donor-name')
      donorName.textContent = data?.name

      // donor address
      const addressEl = document.createElement('address')
      addressEl.classList.add('donor-address')
      addressEl.textContent = `${data?.thana?.en_name}, ${data?.district?.en_name}`

      // donor blood group
      const bloodEl = document.createElement('h2')
      bloodEl.classList.add('donor-blood-type')
      bloodEl.textContent = data.blood_type

      // donor mobile
      const mobile = document.createElement('span')
      mobile.classList.add('donor-mobile')

      const phoneIconEl = document.createElement('i')
      phoneIconEl.classList.add('fa-solid')
      phoneIconEl.classList.add('fa-phone')

      const mobileText = document.createElement('span')
      mobileText.textContent = data.mobile

      mobile.appendChild(phoneIconEl)
      mobile.appendChild(mobileText)

      // group
      const nameAndAddress = document.createElement('div')
      nameAndAddress.append(donorName)
      nameAndAddress.append(addressEl)

      // group 2
      const bloodAndMobile = document.createElement('div')
      bloodAndMobile.append(bloodEl)
      bloodAndMobile.append(mobile)

      donorCard.appendChild(userIcon)
      donorCard.append(nameAndAddress)
      donorCard.append(bloodAndMobile)

      targetDOM.append(donorCard)
    })
  } else {
    targetDOM.innerHTML = `
          <div class="donor-card">
              <div class="data-loading">
                <span>The donor was not found with this filter.</spa>
              </div>
            </div>`
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
    <option value="#" disabled>Loading...</option>
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
    <option value="#" disabled>Loading...</option>
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
    await fetchDonor()
  })
}

// district on select fetch thana data and render to thana selection menu
function handleDistrictSelection() {
  const districtSelectElement = document.querySelector('#district')
  districtSelectElement.addEventListener('change', async function (event) {
    await thanaRender(event.target.value)
    await fetchDonor()
  })
}

// select thana
function handleThanaSelection() {
  const thanaEl = document.querySelector('#thana')
  thanaEl.addEventListener('change', async function (event) {
    await fetchDonor()
  })
}

// add donor
function handleDonorInsertForm() {
  const donorRegForm = document.querySelector('#donor-registration')

  if (!donorRegForm) return

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
