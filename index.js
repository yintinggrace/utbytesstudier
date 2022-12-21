"use strict";

create_levels_filter();
create_subjects_filter();
create_language_filter();
create_countries_cities_filters();

document.querySelector("#search_field button").addEventListener("click", update_programmes);

update_programmes();

// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.

const button = document.querySelector("#country_filter button");
button.addEventListener("click", toggle_cities);
