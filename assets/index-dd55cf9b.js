(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function o(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=o(l);fetch(l.href,s)}})();function _(e,t){return(t=t||["задача","задачи","задач"])&&t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}const u=document.querySelector(".todo__field > .todo__entry"),h=document.querySelector(".todo__add"),r=document.querySelector(".todo__list");let c=document.getElementsByClassName("checked"),a="all";document.querySelector(".todo__theme").addEventListener("click",e=>{document.body.classList.contains("dark")?(f("light"),localStorage.setItem("theme","light")):(f("dark"),localStorage.setItem("theme","dark"))});function f(e){const{BASE_URL:t}={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1};e==="dark"?(document.querySelector(".todo__theme > img").src=`${t}icon-sun.svg`,document.body.classList.add("dark")):e==="light"&&(document.querySelector(".todo__theme > img").src=`${t}icon-moon.svg`,document.body.classList.remove("dark"))}u.addEventListener("keydown",e=>{e.key==="Enter"&&e.target.value!==""&&y(e.target.value)});h.addEventListener("click",()=>{u.value!==""&&y(u.value)});function y(e){const t=Date.now();r.insertAdjacentHTML("beforeend",`
		<li class="todo__item">
			<div class="todo__item-check">
				<input
					type="checkbox"
					aria-label="Отметить задачу как выполненную"
					id="${t}"
				/>
				<label for="${t}"></label>
			</div>

			<p class="todo__item-text">
				${e}
			</p>
			<button
				class="todo__item-delete"
				aria-label="Удалить задачу"
			>
				<span></span>
				<span></span>
			</button>
		</li>
		`),u.value="",d(),i(a),S({id:t,text:e,checked:!1})}r.addEventListener("click",e=>{if(e.target.closest(".todo__item-delete"))document.querySelectorAll(".todo__item").length<=1&&(a="all",i("all")),e.target.closest(".todo__item").remove(),d(),p(+e.target.closest(".todo__item").querySelector("input").id);else if(e.target.matches('.todo__item-check input[type="checkbox"]')){const t=e.target.closest(".todo__item");e.stopPropagation(),t.classList.contains("checked")?t.classList.contains("checked")&&(t.style.order="",g(t.querySelector("input").id,!1)):(c.length>0?t.style.order=c.length+1:c.length===0&&(t.style.order=1),g(t.querySelector("input").id,!0)),t.classList.toggle("checked"),i(a)}});document.querySelector(".todo__items-clear").addEventListener("click",()=>{r.querySelectorAll(".todo__item").forEach(e=>{e.remove(),d()}),a="all",i("all"),k()});document.addEventListener("DOMContentLoaded",()=>{c.length>0&&Array.from(c).forEach(e=>{e.querySelector(".todo__item-check > input").checked=!0})});d();function d(){let e=document.querySelector(".todo__items-count");r.children.length===0?(e.textContent="Пусто",document.querySelector(".todo__items-footer").classList.add("empty")):r.children.length>=1&&(document.querySelector(".todo__items-footer").classList.remove("empty"),e.textContent=`${r.childElementCount} ${_(r.childElementCount)}`)}document.querySelector(".todo__items-status").addEventListener("click",e=>{e.target.closest(".all")?(i("all"),a="all"):e.target.closest(".active")?(i("active"),a="active"):e.target.closest(".completed")&&(i("completed"),a="completed")});function i(e="all"){const t=document.querySelectorAll(".todo__item");e==="all"?(document.querySelectorAll(".todo__items-status button").forEach(o=>o.classList.remove("selected")),document.querySelector(`.${e}`).classList.add("selected"),t.forEach(o=>{o.classList.contains("checked"),o.style.display="flex"})):e==="active"?(document.querySelectorAll(".todo__items-status button").forEach(o=>o.classList.remove("selected")),document.querySelector(`.${e}`).classList.add("selected"),t.forEach(o=>{o.classList.contains("checked")?o.style.display="none":o.style.display="flex"})):e==="completed"&&(document.querySelectorAll(".todo__items-status button").forEach(o=>o.classList.remove("selected")),document.querySelector(`.${e}`).classList.add("selected"),t.forEach(o=>{o.classList.contains("checked")?o.style.display="flex":o.style.display="none"}))}localStorage.getItem("tasks")||localStorage.setItem("tasks",JSON.stringify([]));function S(e){let t=JSON.parse(localStorage.getItem("tasks"));t.push(e),localStorage.setItem("tasks",JSON.stringify(t))}function p(e){let t=JSON.parse(localStorage.getItem("tasks"));t=t.filter(o=>o.id!==e),localStorage.setItem("tasks",JSON.stringify(t))}function k(){let e=JSON.stringify([]);localStorage.setItem("tasks",e)}function g(e,t){let o=JSON.parse(localStorage.getItem("tasks"));o[o.findIndex(n=>n.id==e)].checked=t,localStorage.setItem("tasks",JSON.stringify(o))}L();function L(){localStorage.getItem("theme")&&(console.log(localStorage.getItem("theme")),f(localStorage.getItem("theme"))),JSON.parse(localStorage.getItem("tasks")).forEach(t=>{r.insertAdjacentHTML("beforeend",`
		<li class="todo__item ${t.checked&&"checked"}">
			<div class="todo__item-check">
				<input
					type="checkbox"
					aria-label="Отметить задачу как выполненную"
					id="${t.id}"	
				/>
				<label for="${t.id}"></label>
			</div>

			<p class="todo__item-text">
				${t.text}
			</p>
			<button
				class="todo__item-delete"
				aria-label="Удалить задачу"
			>
				<span></span>
				<span></span>
			</button>
		</li>
		`),Array.from(c).forEach(o=>{c.length>0?o.style.order=c.length+1:c.length===0&&(o.style.order=1)})}),d(),i(a)}
