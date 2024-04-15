document.addEventListener('DOMContentLoaded', function () {
  tabFn() // tab control
  fetchData('division-tab') // fetch data
  divisionFormSubmissionControl() // insert division
  districtFormSubmissionControl() // insert new district
  thanaFormSubmissionControl() // insert new thana
})

window.addEventListener('load', defaultTab)

// default tab
function defaultTab() {
  const { hash } = window.location
  // get target id
  const target = hash
  // get tab content by target id
  const targetElement = document.querySelector(target)

  // if target element not found throw error
  if (!targetElement) {
    throw new Error(
      `Couldn't find any element by this id "${target.substring(1, target.length)}"`,
    )
  }

  // clear all active content
  clearTabContentVisibility()
  // clear all active tab toggle
  clearTabTogglerVisibility()

  fetchData(target.substring(1, target.length))

  // active target element
  targetElement.setAttribute('data-show', true)

  const toggler = document.querySelector(
    `.tab-toggler[data-target="${target}"]`,
  )

  toggler.setAttribute('data-active', true)
}

// tab control
function tabFn() {
  // get tab
  const tab = document.querySelectorAll('.tab')

  tab.forEach(function (t) {
    // get all togglers
    const togglers = t.querySelectorAll('.tab-toggler')

    togglers.forEach(function (toggler) {
      toggler.addEventListener('click', function (event) {
        // get target id
        const target = event.target.dataset.target
        // get tab content by target id
        const targetElement = document.querySelector(target)

        // if target element not found throw error
        if (!targetElement) {
          throw new Error(
            `Couldn't find any element by this id "${target.substring(1, target.length)}"`,
          )
        }

        // clear all active content
        clearTabContentVisibility()
        // clear all active tab toggle
        clearTabTogglerVisibility()

        fetchData(target.substring(1, target.length))

        // active target element
        targetElement.setAttribute('data-show', true)
        event.target.setAttribute('data-active', true)
      })
    })
  })
}

// clear all tab content visibility
function clearTabContentVisibility() {
  const content = document.querySelectorAll('.tab-content')
  content.forEach((el) => el.removeAttribute('data-show'))
}

// clear all tab toggler
function clearTabTogglerVisibility() {
  const togglers = document.querySelectorAll('.tab-toggler')
  togglers.forEach((el) => el.removeAttribute('data-active'))
}

// create table heading name
function convertName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

let fetchController
// function  fetch
async function api(url) {
  // Abort previous fetch request if it exists
  if (fetchController) {
    fetchController.abort()
  }

  // Create new fetch controller
  fetchController = new AbortController()
  const signal = fetchController.signal

  try {
    const response = await fetch(`/api/${url}`, { signal })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json().then((res) => res.data)
    return data
  } catch (error) {
    console.error('Fetch error:', error.message)
  }
}

// function fetch data
function fetchData(teb) {
  switch (teb) {
    case 'division-tab':
      fetchDivisionData()
      break
    case 'district-tab':
      fetchDistrictData()
      formDivisionList()
      break
    case 'thana-tab':
      fetchThanaData()
      formDistrictList()
      break
    default:
      return fetchDistrictData()
  }
}

// form division list
async function formDivisionList() {
  const data = await api('divisions')
  const divisionList = document.querySelector('#division-list')
  divisionList.innerHTML =
    '<option value="#" selected disabled>Select Division</option>'
  if (Array.isArray(data) && !data.length) {
    const option = document.createElement('option')
    option.textContent = 'Data not found!'
    divisionList.append(option)
  } else {
    data.map((d) => {
      const option = document.createElement('option')
      option.textContent = d.en_name
      option.value = d.id
      divisionList.append(option)
    })
  }
}

// fetch district
async function formDistrictList() {
  const data = await api('districts')
  const districtList = document.querySelector('#district-list')
  districtList.innerHTML =
    '<option value="#" selected disabled>Select District</option>'

  if (Array.isArray(data) && !data.length) {
    const option = document.createElement('option')
    option.textContent = 'Data not found!'
    districtList.append(option)
  } else {
    data.map((d) => {
      const option = document.createElement('option')
      option.textContent = d.en_name
      option.value = d.id
      districtList.append(option)
    })
  }
}

// empty data
function emptyData(target) {
  const dataTableHead = document.querySelector(`${target} thead`)
  const dataTableBody = document.querySelector(`${target} tbody`)

  dataTableHead.innerHTML = ''
  dataTableBody.innerHTML = ''

  const htr = document.createElement('tr')
  const th = document.createElement('th')
  th.setAttribute('colspan', 5)
  th.textContent = 'Data not found!'
  htr.append(th)
  dataTableHead.append(htr)
}

// render header
function renderTableHeader(cols, target) {
  const dataTableHead = document.querySelector(`${target} thead`)
  const htr = document.createElement('tr')

  // table heading
  cols.forEach(function (col) {
    const th = document.createElement('th')
    th.setAttribute('data-id', col)
    th.textContent = convertName(col)
    htr.append(th)
  })
  dataTableHead.innerHTML = ''
  dataTableHead.append(htr)
}

// render table body
function renderTableBody(data, target) {
  const dataTableBody = document.querySelector(`${target} tbody`)
  dataTableBody.innerHTML = ''

  data.forEach(function (d) {
    const tr = document.createElement('tr')
    for (let i of Object.keys(d)) {
      const td = document.createElement('td')
      td.setAttribute('data-id', i)
      td.textContent = i === 'id' ? d[i].slice(d[i].length - 6) : d[i]
      tr.append(td)
    }

    dataTableBody.append(tr)
  })
}

// render district table
function renderTable(data, target) {
  renderTableHeader(Object.keys(data[0]), target)
  renderTableBody(data, target)
}

// create alert
function createAlert(message, targetDOM) {
  // Check if there's an existing alert in the targetDOM
  const existingAlert = targetDOM.querySelector('.alert')

  // If an existing alert is found, remove it
  if (existingAlert) {
    existingAlert.remove()
  }

  // create a new alert element
  const alert = document.createElement('div')
  alert.classList.add('alert')
  alert.classList.add('alert-danger')
  alert.textContent = message

  // append the new alert to the target
  targetDOM.appendChild(alert)
}

// fetch division
async function fetchDivisionData() {
  try {
    const data = await api('divisions')

    if (Array.isArray(data) && !data.length) {
      emptyData('#division-table')
    } else {
      const organizedData = data.map((d) => ({
        id: d.id,
        slug: d.slug,
        'English name': d.en_name,
        'Bangla name': d.bn_name,
      }))

      renderTable(organizedData, '#division-table')
    }
  } catch (error) {
    console.log(error)
  }
}

// division form control
function divisionFormSubmissionControl() {
  const form = document.querySelector('#division-adding-form')

  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Access the form elements
    const formData = new FormData(event.target)

    try {
      // Send form data to the server
      const response = await fetch('/api/divisions', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchDivisionData()
      } else {
        const { error } = await response.json()
        createAlert(error, form)
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error)
    }
  })
}

// fetch district data
async function fetchDistrictData() {
  try {
    const data = await fetch('/api/districts')
      .then((res) => res.ok && res.json())
      .then((res) => res && res.data)

    if (Array.isArray(data) && !data.length) {
      emptyData('#district-table')
    } else {
      const organizedData = data.map((d) => ({
        id: d.id,
        slug: d.slug,
        'English name': d.en_name,
        'Bangla name': d.bn_name,
        division: d?.division?.en_name,
      }))

      renderTable(organizedData, '#district-table')
    }
  } catch (error) {
    console.log(error)
  }
}
// function districtFormSubmissionControl
// division form control
function districtFormSubmissionControl() {
  const form = document.querySelector('#district-adding-form')

  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Access the form elements
    const formData = new FormData(event.target)

    try {
      // Send form data to the server
      const response = await fetch('/api/districts', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchDistrictData()
      } else {
        const { error } = await response.json()
        createAlert(error, form)
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error)
    }
  })
}

// fetch district data
async function fetchThanaData() {
  try {
    const data = await fetch('/api/thana')
      .then((res) => res.ok && res.json())
      .then((res) => res && res.data)

    if (Array.isArray(data) && !data.length) {
      emptyData('#thana-table')
    } else {
      const organizedData = data.map((d) => ({
        id: d.id,
        slug: d.slug,
        'English name': d.en_name,
        'Bangla name': d.bn_name,
        district: d?.district?.en_name,
      }))

      renderTable(organizedData, '#thana-table')
    }
  } catch (error) {
    console.log(error)
  }
}

// thana form control
function thanaFormSubmissionControl() {
  const form = document.querySelector('#thana-adding-form')

  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Access the form elements
    const formData = new FormData(event.target)

    try {
      // Send form data to the server
      const response = await fetch('/api/thana', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchThanaData()
      } else {
        const { error } = await response.json()
        console.log({ error })
        createAlert(error, form)
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error)
    }
  })
}
