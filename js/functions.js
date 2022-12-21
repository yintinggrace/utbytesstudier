function click_filter_element(event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE
  */

  event.stopPropagation();
  event.target.classList.toggle("selected");
  update_programmes();
}


function create_filter_element(data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const new_dom_element = document.createElement("li");
  new_dom_element.classList.add(data.class);
  data.parent.appendChild(new_dom_element);
  new_dom_element.textContent = data.textContent;
  new_dom_element.addEventListener("click", click_filter_element);

  return new_dom_element;
}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}


// VG
// CODE according to specifications
function toggle_cities (event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements

    NO RETURN VALUE

  */

}


function create_countries_cities_filters () {

  /*
  ARGUMENTS
    Function receives no argument.

  SIDE-EFFECTS
    - Calls function create_country to loop through array COUNTRIES
    - Calls function create_city to loop through array cities (i.e., filtered cities)

  RETURN VALUE
    No return value
  */

  function create_country (country) {

    /*
      ARGUMENTS
        Function receives an argument representing the objects of the array, COUNTRIES.

      SIDE-EFFECTS
        - Creates a dom-element with the "div" tag.
        - Gives the dom-element the class names "country" and "filter_container" respectively.
        - Gives the dom-element an id number according to the object's id. Name it "country_". E.g. country_0.
        - Appends the dom-element to the "#country_filter > ul" element, which acts as a parent.
        - Sets the text content of the dom-element to an h1 and an ul.
          - Passes the object name as the content of h1.
          - Gives a class name "filter_list" to ul.
        - Filters the cities from array, CITIES, that contain the same countryID as the current object's id.
        - Calls the function, create_city, to loop through the filtered cities.

      RETURN VALUE
        Returns the cities that contain the same countryID as the current object's id
    */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  function create_city (city) {

    /*
      ARGUMENTS
        Function receives an argument representing the objects of array, cities.

      SIDE-EFFECTS
        Creates a dom-element that calls a function create_filter_element.
        The dom will:
          1. include a parent with a reference to an HTML-element on the web page
          2. include a class with a class name "selected"
          3. include textContent with the value from the argument
        Creates a dataset id for the dom based on the object's id

      RETURN VALUE
        No return value
    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;
  }

  array_each(COUNTRIES, create_country);
}

function create_filters(ARRAY, parent) {

  /*
  ARGUMENTS
    - Function create_filters receives two arguments representing an array and a parent with a reference to an HTML-element on the web page.
    - Call other function create_filter inside create_filters.
      - Function create_filter receives object from the called array.

  SIDE-EFFECTS
    - Creates a dom-element that calls a function create_filter_element.
    - The dom will:
      1. include a parent with the value of the called parent
      2. include a class with a class name "selected"
      3. include textContent with the value of the object's name from the called array
    - Creates a dataset id for the dom based on the object's id

  RETURN VALUE
    No return value
*/

  function create_filter(object) {
    const dom = create_filter_element({
      parent: parent,
      class: "selected",
      textContent: object.name,
    });

    dom.dataset.id = object.id;
  }

  array_each(ARRAY, create_filter);
}

function create_levels_filter() {
  create_filters(LEVELS, document.querySelector("#level_filter > ul"));
}

function create_subjects_filter() {
  create_filters(SUBJECTS, document.querySelector("#subject_filter > ul"));
}

function create_language_filter() {
  create_filters(LANGUAGES, document.querySelector("#language_filter > ul"));
}

function create_programme(programme) {
  /*
    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.

      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.

      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE
  */

  const program_dom = document.createElement("li");
  const container = document.querySelector("#programmes > ul");
  container.appendChild(program_dom);

  function find_uni(uni_object) {
    return programme.universityID === uni_object.id;
  }

  function find_city(city_object) {
    return uni.cityID === city_object.id;
  }

  function find_country(country_object) {
    return city.countryID === country_object.id;
  }

  function find_level(level_object) {
    return programme.levelID === level_object.id;
  }

  function find_subject(subject_object) {
    return programme.subjectID === subject_object.id;
  }

  function find_language(language_object) {
    return programme.languageID === language_object.id;
  }

  const uni = array_find(UNIVERSITIES, find_uni);
  const city = array_find(CITIES, find_city);
  const country = array_find(COUNTRIES, find_country);
  const level = array_find(LEVELS, find_level);
  const subject = array_find(SUBJECTS, find_subject);
  const language = array_find(LANGUAGES, find_language);
  const average_entry_grade = array_average(programme.entryGrades);
  const average_success_rate = array_average(programme.successRate);
  const percentage = percenter(city.sun, 365);
  const random_number = array_random_element(city.imagesNormal);

  program_dom.innerHTML = `
  <div class="top">
    <div class="programme_basic">
      <div class="programme_name">${programme.name}</div>
      <div>${uni.name}</div>
      <div>${city.name}, ${country.name}</div>
      <div>${level.name}, ${subject.name}, ${language.name}</div>
    </div>
    <div class="box">
      <div class="show_more_button">show more</div>
      <div class="hidden_content remained_content">
        <div class="show_less_button">show less</div>
        <div>Average entry grade: ${average_entry_grade}</div>
        <div>Success rate: ${average_success_rate}%</div>
        <div>Exchange ratio: ${programme.exchangeStudents}/${programme.localStudents}</div>
      </div>
    </div>
  </div>
  <div class="sun_index">${city.name}, sun-index: ${city.sun} (${percentage}%)</div>
  `;

  program_dom.style.backgroundImage = `url("./media/geo_images/${random_number}")`;
  program_dom.style.backgroundPosition = "center";
  program_dom.style.backgroundSize = "cover";
  program_dom.style.borderRadius = "5px";

  const show_more_buttons = document.querySelectorAll(".show_more_button");
  for (let show_more_button of show_more_buttons) {
    show_more_button.addEventListener("click", show_hidden_content);
  }

}

function show_hidden_content(event) {
  const hidden_lines = event.target.nextElementSibling;
  console.log(event.target.nextElementSibling);
  hidden_lines.classList.remove("hidden_content");
  event.target.textContent = "";
}

function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE
  */

  const programmes = read_filters();

  const no_programme_statement = document.querySelector("#programmes p");
  const ul_container = document.querySelector("#programmes > ul");

  ul_container.innerHTML = "";

  if (programmes.length > 0) {
    no_programme_statement.classList.add("hide_statement");
    array_each(programmes, create_programme);
    // array_each(programmes, create_header_images);
  } else {
    no_programme_statement.classList.remove("hide_statement");
  }
}


function read_filters() {

  /*
  ARGUMENTS
    - Function read_filters receives no argument.

  SIDE-EFFECTS
    1. Form array "programmes"
      1.1 Loop through all selected cities with class "selected" of #country_filter
          - transform data id of all  selected elements from strings to numbers
          - push all numbers into an array, "city_id_selected"
      1.2 Compare objects of city_id_selected with the key values of UNIVERSITIES' cityID
          - push the UNIVERSITIES' objects into array, "universities", if the above values are exactly the same
      1.3 Loop through array, "universities"
          - compare the key values of university's id with the key values of universityID of array "PROGRAMMES"
          - push the PROGRAMMES' objects into array, "programmes", if the above values are exactly the same

    2. Get the filtered programmes through level, language and subject respectively
      2.1 Loop through all selected levels with class "selected" of #level_filter / #language_filter / #subject_filter
          - transform data id of all selected elements from strings to numbers
          - push all numbers into the array, "level_id_selected" / "language_id_selected" / "subject_id_selected"
      2.2 Filter the array "programmes"
          - return true if array, "level_id_selected" / "language_id_selected" / "subject_id_selected", includes the values of the key value of levelID / languageID /subjectID of array "programmes"
          - objects are pushed into a new array "programmes" if return is true

    3. Get the filtered programmes through input's values
      - if the value of the input is not empty/nothing
        - reutrn true if the key values of "name" from array "programmes" include the input values
        - objects are pushed into a new array "programmes" if return is true

  RETURN VALUE
    Returns the value of array "programmes".
*/

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);


  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);


  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);

  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);


  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);

  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);


  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
