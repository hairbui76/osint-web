const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchList = [
	{
		name: "Social Scan",
		api: "https://cse.google.com/cse.js?cx=526e48a5594240cd2",
	},
	{
		name: "Documents",
		api: "https://cse.google.com/cse.js?cx=2df639e86e71ebefb",
	},
	{
		name: "Index",
		api: "https://cse.google.com/cse.js?cx=4e894d36c0415e822",
	},
];

for (let x of searchList) {
	$("#menu").innerHTML += `<div class = option><p>${x.name}</p></div>`;
}

const options = $$(".option");
const averageWidth = 100 / options.length;
const line = $("#line");

let scriptsList = [];
for (let i = 0; i < searchList.length; ++i) {
	scriptsList[i] = searchList[i].api;
}

//set width of div-option
for (let x of options) x.style.width = averageWidth + "%";

//add script
let searchBar = document.createElement("div");
searchBar.id = "search-bar";
searchBar.className = "gcse-search";
let searchBarsList = [];
let containSearchBar = [];
let scriptsTags = [];
let check = false;

for (let i = 0; i < scriptsList.length; ++i) {
	containSearchBar[i] = document.createElement("div");
	searchBarsList[i] = searchBar.cloneNode(true);
	scriptsTags[i] = document.createElement("script").cloneNode(true);
	scriptsTags[i].src = scriptsList[i];
	searchBarsList[i].appendChild(scriptsTags[i]);
	containSearchBar[i].appendChild(searchBarsList[i]);
}

[...options].forEach(arrangeScripts);

function arrangeScripts(option, index) {
	option.onclick = function () {
		line.style.left = option.offsetLeft + "px";
		line.style.width = option.offsetWidth + "px";
		for (let i = 0; i < containSearchBar.length; ++i) {
			if (i != index) {
				options[i].classList.remove("checked");
				containSearchBar[i].remove();
			} else {
				document.body.appendChild(containSearchBar[i]);
				option.classList.add("checked");
			}
		}
	};
}

const arrangeLine = () => {
	line.style.left = $(".checked").offsetLeft + "px";
	line.style.width = $(".checked").offsetWidth + "px";
};

window.addEventListener("resize", arrangeLine);
