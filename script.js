// ---- Edit your projects here ----
var PROJECTS=[
{id:"jacobs",tex:"t-green",/* img:"images/jacobs.jpg", shot:true, */ title:"Jacobs",tagline:"Designing a website that shows off the Visual Media Group’s work",tags:["UX/UI","Research","Internship"],
role:"UX/UI Intern",time:"May 2026 to Nov 2026",tools:"Figma",
overview:"I researched, designed, and presented the website for Jacobs’ Visual Media Group, which showcases the team’s work to internal and external clients.",
did:["Led 10+ user interviews to shape the site’s structure and branding direction.","Designed wireframes, prototypes, and high-fidelity mockups.","Presented to 5 department heads and iterated across 5 rounds of feedback for a clearer design."]},
{id:"students-as-partners",tex:"t-pink",title:"Students as Partners in Education",tagline:"Turning 4,000+ survey responses into decisions for 20,000+ students",tags:["Research","Data viz"],
role:"Student Researcher",time:"Jan 2025 to present",tools:"Qualtrics",
overview:"I run user research across 12 academic departments to improve the learning experience for more than 20,000 students.",
did:["Collected and analyzed 4,000+ survey responses using Qualtrics.","Translated complex feedback into insights through a structured design lifecycle.","Delivered executive-ready reports and data visualizations that inform curriculum decisions."]},
{id:"praying-next-generation",tex:"t-orange",title:"Praying for the Next Generation",tagline:"Building the UX foundation for a mission-driven product",tags:["UX","Discovery","Handoff"],
role:"Lead UX Designer",time:"Jan 2026 to present",tools:"Figma",
overview:"I’m turning a mission-driven idea into a product with clear foundations that can grow into a full website.",
did:["Led stakeholder discovery sessions to clarify requirements, branding direction, and target users.","Designed low-fidelity wireframes and user flows, iterating on structured feedback.","Partnered with developers on a smooth design-to-development handoff."]}
// To add La Moda Local, copy a block above, give it tex:"t-purple" and a new id.
];

var $=function(s){return document.querySelector(s)};
// Card/hero art: texture background, plus an optional image (see "img" and "shot" in PROJECTS)
function art(p){
  if(!p.img)return '<div class="tex '+p.tex+'"></div>';
  return '<div class="tex '+p.tex+(p.shot?' shot':'')+'"><img src="'+p.img+'" alt="'+(p.alt||p.title)+'"></div>';
}
var views=["home","project","about","cv"];

// Build home cards
$("#work").innerHTML=PROJECTS.map(function(p){
  return '<a class="card" href="#'+p.id+'">'+art(p)+'<h2>'+p.title+'</h2><p>'+p.tagline+'</p><div class="tags">'+p.tags.map(function(t){return "<span>"+t+"</span>"}).join("")+'</div></a>';
}).join("");

function show(name){
  views.forEach(function(v){$("#v-"+v).classList.toggle("on",v===name)});
  var cur=name==="home"?"work":name;
  document.querySelectorAll("[data-nav]").forEach(function(a){
    if(a.dataset.nav===cur&&name!=="project")a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
}

function projectView(i){
  var p=PROJECTS[i],n=PROJECTS[(i+1)%PROJECTS.length],pr=PROJECTS[(i+PROJECTS.length-1)%PROJECTS.length];
  $("#v-project").innerHTML='<div class="proj"><a class="back" href="#work">← all work</a>'+art(p)+'<h1>'+p.title+'</h1><p class="lede">'+p.tagline+'</p>'
  +'<dl class="meta"><div><dt>Role</dt><dd>'+p.role+'</dd></div><div><dt>Timeline</dt><dd>'+p.time+'</dd></div><div><dt>Tools</dt><dd>'+p.tools+'</dd></div></dl>'
  +'<h3>Overview</h3><p>'+p.overview+'</p><h3>What I did</h3><ul>'+p.did.map(function(d){return "<li>"+d+"</li>"}).join("")+'</ul>'
  +'<div class="note">Full case study coming soon: the problem, my process, screenshots, and results.</div>'
  +'<div class="next"><a href="#'+pr.id+'">← '+pr.title+'</a><a href="#'+n.id+'">'+n.title+' →</a></div></div>';
}

function route(){
  var h=location.hash.slice(1);
  var i=PROJECTS.findIndex(function(p){return p.id===h});
  if(i>-1){projectView(i);show("project");window.scrollTo(0,0);return}
  if(h==="about"||h==="cv"){show(h);window.scrollTo(0,0);return}
  show("home");
  if(h==="work"){var el=$("#work");if(el)el.scrollIntoView()}else window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
route();
