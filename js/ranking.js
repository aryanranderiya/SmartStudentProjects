var tabs = document.querySelectorAll(".lboard_tabs ul li");
var students = document.querySelector(".students");
var universities = document.querySelector(".universities");
var projects = document.querySelector(".projects");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    var currenttab = tab.getAttribute("data-li");

    tabs.forEach(function (tab) {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    items.forEach(function (item) {
      item.style.display = "none";
    });

    if (currenttab == "students") {
      students.style.display = "block";
    } else if (currenttab == "universities") {
      universities.style.display = "block";
    } else {
      projects.style.display = "block";
    }
  });
});
