"use strict";

create_levels_filter();
create_subjects_filter();
create_language_filter();
create_countries_cities_filters();

document.querySelector("#search_field button").addEventListener("click", update_programmes);

update_programmes();

add_group_toggling_all();

const button = document.querySelector("#country_filter button");
button.addEventListener("click", toggle_cities);
