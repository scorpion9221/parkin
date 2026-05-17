
const destinations = [
  {id:1,name:"Arkan Plaza",type:"Mall",location:"Sheikh Zayed, Giza",area:"Sheikh Zayed",rating:4.8,distance:2.5,price:20,eventPrice:0,available:450,total:1200,image:"url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1300&q=80')",why:"Arkan Plaza premium facilities."},
  {id:2,name:"Walk of Cairo",type:"Mall",location:"Sheikh Zayed, Giza",area:"Sheikh Zayed",rating:4.5,distance:4.1,price:15,eventPrice:0,available:320,total:800,image:"url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80')",why:"Outdoor shopping and dining with organized smart access."},
  {id:3,name:"Cairo Jazz Festival",type:"Event",location:"AUC Tahrir Square",area:"Downtown Cairo",rating:4.9,distance:15.2,price:50,eventPrice:50,available:150,total:200,image:"url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1300&q=80')",why:"Fast entry for high-traffic events and festivals."},
  {id:4,name:"Mall of Arabia",type:"Mall",location:"6th of October, Giza",area:"6th of October",rating:4.7,distance:8.4,price:20,eventPrice:0,available:850,total:3500,image:"url('https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1300&q=80')",why:"Large capacity with multiple floor zones."},
  {id:5,name:"Capital Business Park",type:"Mall",location:"Sheikh Zayed, Giza",area:"Sheikh Zayed",rating:4.6,distance:1.2,price:22,eventPrice:0,available:120,total:600,image:"url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1300&q=80')",why:"Premium office parking near business facilities."},
  {id:6,name:"Heliopolis Club",type:"Event",location:"Heliopolis, Cairo",area:"Heliopolis",rating:4.4,distance:22.1,price:50,eventPrice:50,available:45,total:300,image:"url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1300&q=80')",why:"Event-ready parking with quick checkout."}
];

const floorSpotPatterns = {
  A:[["A-01","available"],["A-02","reserved"],["A-03","available"],["A-04","available"],["A-05","available"],["A-06","reserved"],["A-07","available"],["A-08","available"],["A-09","available"],["A-10","reserved"],["A-11","premium"],["A-12","available"],["A-13","reserved"],["A-14","recommended"],["A-15","occupied"],["A-16","reserved"],["A-17","recommended"],["A-18","occupied"],["A-19","occupied"],["A-20","available"],["A-21","reserved"],["A-22","available"],["A-23","reserved"],["A-24","recommended"]],
  B:[["B-01","available"],["B-02","available"],["B-03","reserved"],["B-04","premium"],["B-05","recommended"],["B-06","available"],["B-07","occupied"],["B-08","available"],["B-09","reserved"],["B-10","available"],["B-11","premium"],["B-12","available"],["B-13","occupied"],["B-14","recommended"],["B-15","available"],["B-16","reserved"]],
  C:[["C-01","available"],["C-02","available"],["C-03","available"],["C-04","occupied"],["C-05","reserved"],["C-06","available"],["C-07","recommended"],["C-08","available"],["C-09","available"],["C-10","reserved"],["C-11","available"],["C-12","premium"],["C-13","available"],["C-14","occupied"],["C-15","available"],["C-16","reserved"]],
  P:[["P-01","premium"],["P-02","premium"],["P-03","premium"],["P-04","reserved"],["P-05","recommended"],["P-06","premium"],["P-07","occupied"],["P-08","premium"],["P-09","premium"],["P-10","recommended"],["P-11","reserved"],["P-12","premium"]]
};

let state = {
  view:"grid",
  floor:"A",
  loggedIn:false,

  currentUser:{
    name:"Guest User",
    email:"",
    phone:""
  },

  currentDestination:destinations[0],
  selectedSpot:null,
  selectedSpotType:"Regular",
  selectedPrice:20,
  selectedPayment:"Card",
  walletBalance:450,
  history:[
    {id:"PK-1001-XJ",destination:"Arkan Plaza",location:"Sheikh Zayed, Giza",spot:"A-14",date:"Oct 12, 2023",timeIn:"14:30",timeOut:"16:45",duration:"2h 15m",amount:"60.00 EGP",status:"completed",payment:"•••• 4242 (Visa)"},
    {id:"PK-1002-XJ",destination:"Walk of Cairo",location:"Sheikh Zayed, Giza",spot:"B-12",date:"Oct 10, 2023",timeIn:"13:00",timeOut:"14:30",duration:"1h 30m",amount:"30.00 EGP",status:"completed",payment:"Parkin Wallet"},
    {id:"PK-1003-XJ",destination:"Mall of Arabia",location:"6th of October, Giza",spot:"C-02",date:"Oct 08, 2023",timeIn:"16:00",timeOut:"19:45",duration:"3h 45m",amount:"75.00 EGP",status:"completed",payment:"•••• 1111 (Visa)"},
    {id:"PK-1004-XJ",destination:"Cairo Jazz Festival",location:"AUC Tahrir Square",spot:"E-10",date:"Oct 05, 2023",timeIn:"18:00",timeOut:"22:00",duration:"4h 00m",amount:"50.00 EGP",status:"active",payment:"Mobile Wallet"}
  ],
  lastReceipt:null
};

function saveState(){
  localStorage.setItem("parkinState", JSON.stringify({
    loggedIn:state.loggedIn,currentUser:state.currentUser,walletBalance:state.walletBalance,
    history:state.history,lastReceipt:state.lastReceipt,currentDestination:state.currentDestination,
    selectedSpot:state.selectedSpot,selectedSpotType:state.selectedSpotType,selectedPrice:state.selectedPrice
  }));
}
function loadState(){
  const saved = localStorage.getItem("parkinState");
  if(!saved) return;
  try{
    const parsed = JSON.parse(saved);
    state = {...state,...parsed};
    if(!state.currentDestination) state.currentDestination = destinations[0];
  }catch(e){}
}
function navTo(page){ window.location.href = page; }
function getStarted(){ navTo(state.loggedIn ? "destinations.html" : "register.html"); }


function toast(message){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.style.display = "block";
  clearTimeout(t.timer);
  t.timer = setTimeout(()=> t.style.display = "none", 2600);
}
function updateNav(){
  const sign = document.getElementById("navSignIn");
  const dash = document.getElementById("navDashboard");
  const navActions = document.querySelector(".nav-actions");

  if(sign) sign.classList.toggle("hidden", state.loggedIn);
  if(dash) dash.classList.toggle("hidden", !state.loggedIn);

  // Add logout button automatically on every page without editing all HTML files.
  if(navActions && !document.getElementById("navLogout")){
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "navLogout";
    logoutBtn.className = "btn btn-outline btn-logout hidden";
    logoutBtn.type = "button";
    logoutBtn.textContent = "Log Out";
    logoutBtn.onclick = logoutUser;
    navActions.appendChild(logoutBtn);
  }

  const logout = document.getElementById("navLogout");
  if(logout) logout.classList.toggle("hidden", !state.loggedIn);
}


function renderCard(d){
  const percent = Math.round((d.available / d.total) * 100);
  const priceText = d.type === "Event" ? `${d.price} EGP/session` : `${d.price} EGP/hr`;
  return `
    <article class="destination-card card" onclick="openDestination(${d.id})">
      <div class="cover" style="--img:${d.image}">
        <div class="tags"><span class="tag">${d.type}</span><span class="tag cyan">${priceText}</span></div>
        <div class="rating">★ ${d.rating}</div>
        <h3>${d.name}</h3>
        <p>⌖ ${d.location}</p>
        <div class="distance">Distance<br>${d.distance} km</div>
      </div>
      <div class="card-body">
        <div class="availability-row">
          <div><small>Availability</small><strong>${d.available}</strong> <span style="color:var(--muted)">/ ${d.total} spots</span></div>
          <div class="ring" style="--percent:${percent}"><span>${percent}%</span></div>
        </div>
        <button class="btn btn-dark btn-wide" onclick="event.stopPropagation();openDestination(${d.id})">View Available Spots ›</button>
      </div>
    </article>
  `;
}
function renderFeatured(){
  const grid = document.getElementById("featuredGrid");
  if(grid) grid.innerHTML = destinations.slice(0,3).map(renderCard).join("");
}
function renderDestinations(){
  const grid = document.getElementById("destinationsGrid");
  if(!grid) return;
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const type = document.getElementById("typeFilter")?.value || "all";
  const sort = document.getElementById("sortFilter")?.value || "nearest";
  let data = destinations.filter(d => {
    const matchesSearch = [d.name,d.location,d.area,d.type].join(" ").toLowerCase().includes(search);
    const matchesType = type === "all" || d.type === type;
    return matchesSearch && matchesType;
  });
  if(sort === "nearest") data.sort((a,b)=>a.distance-b.distance);
  if(sort === "available") data.sort((a,b)=>b.available-a.available);
  if(sort === "priceLow") data.sort((a,b)=>a.price-b.price);
  if(sort === "rating") data.sort((a,b)=>b.rating-a.rating);
  grid.className = state.view === "list" ? "grid grid-2" : "grid grid-3";
  grid.innerHTML = data.length ? data.map(renderCard).join("") : `<div class="card" style="padding:40px;grid-column:1/-1;text-align:center"><h2>No destinations found</h2><p style="color:var(--muted)">Try another search keyword.</p></div>`;
}
function setView(view){ state.view = view; renderDestinations(); }
function openDestination(id){
  if(!state.loggedIn){
    localStorage.setItem("parkinRedirectAfterLogin", "destinations.html");
    toast("Please login or create an account first");
    setTimeout(() => navTo("login.html"), 650);
    return;
  }

  const d = destinations.find(x => x.id === id) || destinations[0];

  state.currentDestination = {...d};

  state.selectedSpot = null;
  state.selectedSpotType = "Regular";

  // IMPORTANT FIX
  state.selectedPrice = Number(d.price);

  saveState();
  navTo("details.html");
}
function initDetails(){
  const d = state.currentDestination || destinations[0];
  setText("detailsName", d.name);
  setText("detailsLocation", d.location);
  setText("detailsDistance", d.distance + " km");
  setText("detailsRating", d.rating);
  setText("detailsAvailable", d.available);
  setText("detailsTotal", d.total);
  setText("whyText", d.why);
  setText("regularPrice", d.price);
  setText("premiumPrice", d.price + 5);
  setFloor("A", false);
}
function setText(id, value){ const el = document.getElementById(id); if(el) el.textContent = value; }
function setFloor(floor, renderMessage=true){
  state.floor = floor;
  document.querySelectorAll(".floor-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.floor === floor));
  renderSpots();
  if(renderMessage) toast(`Floor ${floor} selected`);
}
function renderSpots(){
  const grid = document.getElementById("spotsGrid");
  if(!grid) return;
  const spots = floorSpotPatterns[state.floor] || floorSpotPatterns.A;
  grid.innerHTML = spots.map(([code,type]) => `
    <div class="spot ${type} ${state.selectedSpot === code ? "selected" : ""}" onclick="selectSpot('${code}','${type}')">
      ${code}${type === "recommended" ? '<span class="flash">ϟ</span>' : ""}
    </div>
  `).join("");
}
function selectSpot(code,type){
  if(type === "reserved" || type === "occupied"){ toast("This spot is not available"); return; }
  state.selectedSpot = code;
  state.selectedSpotType = type === "premium" || state.floor === "P" ? "Premium" : type === "recommended" ? "Recommended" : "Regular";
  const basePrice = Number(state.currentDestination.price || 0);

state.selectedPrice =
  state.currentDestination.type === "Event"
    ? basePrice
    : basePrice + (state.selectedSpotType === "Premium" ? 5 : 0);
  saveState();
  renderSpots();
  showSpotModal();
  setTimeout(() => {
  const hoursEl = document.getElementById("reservationHours");
  const minutesEl = document.getElementById("reservationMinutes");

  if(hoursEl){
    hoursEl.addEventListener("input", updateModalPrice);
    hoursEl.addEventListener("change", updateModalPrice);
  }

  if(minutesEl){
    minutesEl.addEventListener("input", updateModalPrice);
    minutesEl.addEventListener("change", updateModalPrice);
  }
}, 50);
}
function showSpotModal(){
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth()+1).padStart(2,"0");
  const dd = String(now.getDate()).padStart(2,"0");
  document.getElementById("reservationDate").value = `${yyyy}-${mm}-${dd}`;
  document.getElementById("reservationTime").value = "14:30";
  setText("modalDestination", state.currentDestination.name);
  setText("modalSpot", state.selectedSpot);
  setText("modalType", state.selectedSpotType);
  setText("modalPricing", state.currentDestination.type === "Event" ? `${state.selectedPrice} EGP / session` : `${state.selectedPrice} EGP / hr`);
  updateModalPrice();
  document.getElementById("spotModal").classList.remove("hidden");
  document.body.classList.add("modal-open");
}
function hideSpotModal(){
  document.getElementById("spotModal").classList.add("hidden");
  document.body.classList.remove("modal-open");
}
function closeSpotModal(e){ if(e.target.id === "spotModal") hideSpotModal(); }
function updateModalPrice(){

  const total = calculateTotal();

  setText("modalTotal", money(total));
}
function calculateDurationDecimal(){

  const hours =
    Number(document.getElementById("reservationHours")?.value || 0);

  const minutes =
    Number(document.getElementById("reservationMinutes")?.value || 0);

  const total = hours + (minutes / 60);

  if(hours === 0 && minutes === 0){
    return 0;
  }

  return total;
}
function calculateTotal(){

  const duration = calculateDurationDecimal();

  const pricePerHour =
    state.selectedSpotType === "premium"
      ? 27
      : 22;

  const total = duration * pricePerHour;

  return total.toFixed(2);
}
function calculateDurationDecimal(){
  const hours = Number(document.getElementById("reservationHours")?.value || 0);
  const minutes = Number(document.getElementById("reservationMinutes")?.value || 0);

  const total = hours + (minutes / 60);

  // لو كله صفر يرجع صفر
  if(hours === 0 && minutes === 0){
    return 0;
  }

  return total;
}
function calculateTotal(){

  // Events سعر ثابت
  if(state.currentDestination.type === "Event"){
    return Number(state.currentDestination.price || 0);
  }

  const duration = calculateDurationDecimal();

  // لو الوقت صفر يبقى التوتال صفر
  if(duration <= 0){
    return 0;
  }

  const hourlyPrice = Number(state.selectedPrice || 0);

  return hourlyPrice * duration;
}
function startSession(){

  if(!state.loggedIn){

    hideSpotModal();

    localStorage.setItem(
      "parkinRedirectAfterLogin",
      "details.html"
    );

    toast("Please login first");

    setTimeout(() => navTo("login.html"), 650);

    return;
  }

  const date =
    document.getElementById("reservationDate").value;

  const time =
    document.getElementById("reservationTime").value;

  const hours =
    Number(document.getElementById("reservationHours").value || 0);

  const minutes =
    Number(document.getElementById("reservationMinutes").value || 0);
    const total = calculateTotal();

  localStorage.setItem("parkinDate", date);
  localStorage.setItem("parkinTime", time);
  localStorage.setItem("parkinHours", hours);
  localStorage.setItem("parkinMinutes", minutes);

  localStorage.setItem(
    "parkinDestination",
    JSON.stringify(state.currentDestination)
  );

  localStorage.setItem(
    "parkinSpot",
    state.selectedSpot
  );

  localStorage.setItem(
    "parkinSpotType",
    state.selectedSpotType
  );

  localStorage.setItem(
    "parkinSelectedPrice",
    state.selectedPrice
  );

  localStorage.setItem(
  "parkinTotal",
  total
);
  const bookingData = {

  destination:
    state.currentDestination?.name || "Unknown",

  spot:
    state.selectedSpot,

  date:
    date,

  timeIn:
    time,

  duration:
    `${hours}h ${minutes}m`,

  price:
    total
};

localStorage.setItem(
  "selectedBooking",
  JSON.stringify(bookingData)
);
  saveState();

  hideSpotModal();

  navTo("checkout.html");
}
function initCheckout(){
  if(!state.selectedSpot){ toast("Please select a spot first"); setTimeout(()=>navTo("destinations.html"),700); return; }
  updateCheckout();
}
function getCurrentBookingData(){

  return {
    destination: JSON.parse(localStorage.getItem("parkinDestination") || "{}"),
    spot: localStorage.getItem("parkinSpot") || "",
    spotType: localStorage.getItem("parkinSpotType") || "",
    date: localStorage.getItem("parkinDate") || "",
    time: localStorage.getItem("parkinTime") || "",
    hours: Number(localStorage.getItem("parkinHours") || 0),
    minutes: Number(localStorage.getItem("parkinMinutes") || 0),
    total: Number(localStorage.getItem("parkinTotal") || 0),
    price: Number(localStorage.getItem("parkinSelectedPrice") || 0)
  };
}
function updateCheckout(){

  const booking = getCurrentBookingData();

  setText(
    "payDestination",
    booking.destination.name || "-"
  );

  setText(
    "paySpot",
    booking.spot || "-"
  );

  setText(
    "payDate",
    readableDate(booking.date)
  );

  setText(
    "payTime",
    booking.time
  );

  setText(
    "payDuration",
    `${booking.hours}h ${String(booking.minutes).padStart(2,"0")}m`
  );

  setText(
    "payPrice",
    booking.destination.type === "Event"
      ? `${booking.price} EGP / session`
      : `${booking.price} EGP / hr`
  );

  setText(
    "paySubtotal",
    money(booking.total)
  );

  setText(
    "payTotal",
    money(booking.total)
  );

  setText(
    "checkoutWalletBalance",
    Number(state.walletBalance || 0).toFixed(2)
  );

  updatePaymentLabel();
}
function getDurationText(){

  const h = Number(localStorage.getItem("parkinHours") || 0);
  const m = Number(localStorage.getItem("parkinMinutes") || 0);

  return `${h}h ${String(m).padStart(2,"0")}m`;
}
function addDuration(time,hours,minutes){
  const [h,m] = time.split(":").map(Number);
  const date = new Date(2026,0,1,h,m);
  date.setMinutes(date.getMinutes() + (Number(hours)*60) + Number(minutes));
  return String(date.getHours()).padStart(2,"0") + ":" + String(date.getMinutes()).padStart(2,"0");
}
function selectPaymentMethod(el){
  document.querySelectorAll(".payment-option").forEach(x => x.classList.remove("active"));
  el.classList.add("active");
  state.selectedPayment = el.dataset.method;
  document.getElementById("cardFields").classList.toggle("hidden", state.selectedPayment !== "Card");
  document.getElementById("walletFields").classList.toggle("hidden", state.selectedPayment !== "Wallet");
  document.getElementById("parkinWalletFields").classList.toggle("hidden", state.selectedPayment !== "Parkin Wallet");
  updatePaymentLabel();
}
function updatePaymentLabel(){
  const labelEl = document.getElementById("paymentMethodLabel");
  if(!labelEl) return;
  let label = "PAYMENT METHOD<br><strong>•••• 4242 (Visa)</strong>";
  if(state.selectedPayment === "Wallet") label = "PAYMENT METHOD<br><strong>Mobile Wallet</strong>";
  if(state.selectedPayment === "Parkin Wallet") label = "PAYMENT METHOD<br><strong>Parkin Wallet</strong>";
  labelEl.innerHTML = label;
}

function getReceiptPaymentLabel(){
  if(state.selectedPayment === "Card"){
    const digits = document.getElementById("cardNumber").value.replace(/\D/g,"");
    return `•••• ${digits.slice(-4)} (Visa)`;
  }
  if(state.selectedPayment === "Wallet") return `${document.getElementById("walletProvider").value}`;
  return "Parkin Wallet";
}
function renderReceipt(){

  const r = state.lastReceipt;

  if(!r) return;

  setText("receiptId", r.id);
  setText("receiptDestination", r.destination);
  setText("receiptLocation", r.location);
  setText("receiptSpot", r.spot);
  setText("receiptDate", r.date);
  setText("receiptDuration", r.duration);
  setText("receiptTimeIn", r.timeIn);
  setText("receiptTimeOut", r.timeOut);
  setText("receiptSubtotal", r.amount);
  setText("receiptTotal", r.amount);

  const pay =
    document.getElementById("receiptPayment");

  if(pay){
    pay.innerHTML =
      `PAYMENT METHOD<br><strong>${r.payment}</strong>`;
  }
}


function historyRow(b,index,withCancel=false){
  return `
    <div class="history-row">
      <div><strong>${b.destination}</strong><small style="color:var(--muted)">⌖ ${b.location || ""} • ${b.spot}</small></div>
      <div>${b.date}</div>
      <div>${b.duration}</div>
      <div><strong>${b.amount}</strong></div>
      <div>${b.status === "active" && withCancel ? `<button class="btn btn-danger" onclick="cancelBooking(${index})">Cancel</button>` : `<span class="status ${b.status}">${capitalize(b.status)}</span>`}</div>
    </div>`;
}
function emptyHistory(){ return `<div style="padding:40px;text-align:center;color:var(--muted)">No parking sessions yet.</div>`; }



function demoSocial(provider){
  state.loggedIn = true;
  state.currentUser.name = provider === "Google" ? "Google User" : "GitHub User";
  saveState();
  toast(`${provider} login connected`);
  const redirect = localStorage.getItem("parkinRedirectAfterLogin");
  localStorage.removeItem("parkinRedirectAfterLogin");
  navTo(redirect || "dashboard.html");
}
function clearInvalid(){ document.querySelectorAll(".field").forEach(f => f.classList.remove("invalid")); }
function validateRequired(id){ const el = document.getElementById(id); if(!el.value.trim()){ markInvalid(el); return false; } return true; }
function validateEmail(id){ const el = document.getElementById(id); const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()); if(!ok) markInvalid(el); return ok; }
function validateCardNumber(){ const el = document.getElementById("cardNumber"); const digits = el.value.replace(/\D/g,""); if(digits.length !== 16){ markInvalid(el); return false; } return true; }
function validateExpiry(){ const el = document.getElementById("cardExpiry"); if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(el.value.trim())){ markInvalid(el); return false; } return true; }
function validateCvv(){ const el = document.getElementById("cardCvv"); if(!/^\d{3}$/.test(el.value.trim())){ markInvalid(el); return false; } return true; }
function markInvalid(el){ const field = el.closest(".field"); if(field) field.classList.add("invalid"); }
function formatCardNumber(input){ let value = input.value.replace(/\D/g,"").slice(0,16); input.value = value.replace(/(\d{4})(?=\d)/g,"$1 "); updatePaymentLabel(); }
function formatExpiry(input){ let v = input.value.replace(/\D/g,"").slice(0,4); if(v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2); input.value = v; }
function readableDate(dateStr){ if(!dateStr) return "10 March 2026"; const date = new Date(dateStr + "T00:00:00"); return date.toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"}); }
function money(n){ return Number(n).toFixed(2) + " EGP"; }
function capitalize(s){ return String(s).charAt(0).toUpperCase() + String(s).slice(1); }
function scrollToLot(){ document.getElementById("lot").scrollIntoView({behavior:"smooth",block:"center"}); toast("Navigation started"); }
function toggleFaq(el){ el.classList.toggle("open"); }


function downloadReceipt(){
  const r = state.lastReceipt || state.history[0];
  const lines = ["PARKIN SESSION RECEIPT","----------------------",`ID: ${r.id}`,`Destination: ${r.destination}`,`Location: ${r.location}`,`Spot: ${r.spot}`,`Date: ${r.date}`,`Time In: ${r.timeIn}`,`Time Out: ${r.timeOut}`,`Duration: ${r.duration}`,`Total: ${r.amount}`,`Payment: ${r.payment}`,"Status: PAID"].join("\n");
  const blob = new Blob([lines],{type:"text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "parkin-receipt.txt"; a.click();
  URL.revokeObjectURL(url);
}
function shareReceipt(){
  const r = state.lastReceipt || state.history[0];
  const text = `Parkin receipt ${r.id}: ${r.destination}, spot ${r.spot}, total ${r.amount}`;
  if(navigator.share) navigator.share({title:"Parkin Receipt",text});
  else { navigator.clipboard.writeText(text); toast("Receipt copied to clipboard"); }
}

function protectHomeClicks(){
  const page = document.body.dataset.page;
  if(page !== "home" || state.loggedIn) return;

  document.addEventListener("click", function(e){
    const target = e.target.closest("a,button,.destination-card");
    if(!target) return;

    const text = (target.textContent || "").toLowerCase();
    const href = target.getAttribute("href") || "";

    if(href.includes("login.html") || href.includes("register.html")) return;

    e.preventDefault();
    e.stopPropagation();

    if(text.includes("get started") || text.includes("explore") || text.includes("start your journey")){
      navTo("register.html");
    }else{
      navTo("login.html");
    }
  }, true);
}





/* =========================
   BACKEND API INTEGRATION
   Keeps the same UI and connects it to Node/Express + MongoDB.
========================= */

const API_BASE = 'http://localhost:5000/api';

function getToken(){ return localStorage.getItem('parkinToken'); }
function setToken(token){ localStorage.setItem('parkinToken', token); }
function clearToken(){ localStorage.removeItem('parkinToken'); }
function authHeaders(){ return getToken() ? { Authorization: `Bearer ${getToken()}` } : {}; }
async function apiRequest(path, options = {}){
  const headers = { ...(options.headers || {}) };
  if(!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  Object.assign(headers, authHeaders());
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if(!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
function mapBookingFromApi(b){
  return { id:b.receiptId||b._id, destination:b.destinationName, location:b.destinationLocation, spot:b.spot,
    date:b.dateLabel||readableDate((b.startTime||'').slice(0,10)), timeIn:b.timeIn||((b.startTime||'').slice(11,16)||'--:--'),
    timeOut:b.timeOut||((b.endTime||'').slice(11,16)||'--:--'), duration:b.durationText, amount:money(b.amount||0),
    status:b.status||'completed', payment:b.paymentLabel||'Payment saved' };
}
function applyBackendSession(data){
  if(data.token) setToken(data.token);
  if(data.user){ state.loggedIn=true; state.currentUser={name:data.user.name,email:data.user.email,phone:data.user.phone||''}; state.walletBalance=Number(data.user.walletBalance??state.walletBalance??0); }
  saveState(); updateNav();
}
async function loadBackendProfile(){
  if(!getToken()) return;
  try{ const data=await apiRequest('/auth/me'); applyBackendSession(data); }
  catch(e){ clearToken(); state.loggedIn=false; saveState(); }
}
async function syncHistoryFromBackend(){
  if(!getToken()) return;
  try{ const data=await apiRequest('/bookings'); state.history=(data.bookings||[]).map(mapBookingFromApi); saveState(); }
  catch(e){ console.warn(e.message); }
}
function protectPage(){
  const protectedPages=['destinations','details','checkout','confirmation','dashboard','history','how','about'];
  const page=document.body.dataset.page; state.loggedIn=!!getToken()||state.loggedIn;
  if(protectedPages.includes(page)&&!state.loggedIn){ localStorage.setItem('parkinRedirectAfterLogin', window.location.pathname.split('/').pop()||'destinations.html'); toast('Please login or create an account first'); setTimeout(()=>navTo('login.html'),650); return false; }
  return true;
}
async function loginUser(event){

  event.preventDefault();

  clearInvalid();

  let ok = true;

  ok = validateEmail("loginEmail") && ok;

  const pass = document.getElementById("loginPassword");

  if(pass.value.trim().length < 6){
    markInvalid(pass);
    ok = false;
  }

  if(!ok) return;

  try{

    const email =
      document.getElementById("loginEmail").value.trim();

    const password =
      document.getElementById("loginPassword").value;

    const data = await apiRequest('/auth/login',{
      method:'POST',
      body:JSON.stringify({
        email,
        password
      })
    });

    applyBackendSession(data);

    // تأكيد تحديث الداتا الصح
    if(data.user){

      state.currentUser = {
        name: data.user.name || "Guest User",
        email: data.user.email || "",
        phone: data.user.phone || ""
      };

      state.loggedIn = true;
    }

    saveState();

    toast("Logged in successfully");

    const redirect =
      localStorage.getItem("parkinRedirectAfterLogin") ||
      "dashboard.html";

    localStorage.removeItem("parkinRedirectAfterLogin");

    setTimeout(() => navTo(redirect), 400);

  }catch(e){

    toast(e.message || "Login failed");
  }
}
async function registerUser(event){

  event.preventDefault();

  clearInvalid();

  let ok = true;

  ok = validateRequired("registerName") && ok;
  ok = validateEmail("registerEmail") && ok;
  ok = validateRequired("registerPhone") && ok;

  const pass = document.getElementById("registerPassword");

  if(pass.value.trim().length < 6){
    markInvalid(pass);
    ok = false;
  }

  if(!ok) return;

  try{

    const payload = {
      name: document.getElementById("registerName").value.trim(),
      email: document.getElementById("registerEmail").value.trim(),
      phone: document.getElementById("registerPhone").value.trim(),
      password: pass.value
    };

    const data = await apiRequest('/auth/register',{
      method:'POST',
      body:JSON.stringify(payload)
    });

    applyBackendSession(data);

    if(data.user){

      state.currentUser = {
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || ""
      };

      state.loggedIn = true;
    }

    saveState();

    toast("Account created successfully");

    const redirect =
      localStorage.getItem("parkinRedirectAfterLogin") ||
      "dashboard.html";

    localStorage.removeItem("parkinRedirectAfterLogin");

    setTimeout(() => navTo(redirect), 400);

  }catch(e){

    toast(e.message || "Registration failed");
  }
}
function logoutUser(){

  clearToken();

  state.loggedIn = false;

  state.currentUser = {
    name:"Guest User",
    email:"",
    phone:""
  };

  state.history = [];

  state.lastReceipt = null;

  saveState();

  localStorage.removeItem('parkinRedirectAfterLogin');

  toast('Logged out successfully');

  setTimeout(() => navTo('index.html'), 350);
}
async function completePayment(event){

  event.preventDefault();

  clearInvalid();

  if(state.selectedPayment === 'Card'){

    let ok =
      validateRequired('cardName') &&
      validateCardNumber() &&
      validateExpiry() &&
      validateCvv();

    if(!ok) return;
  }

  if(
    state.selectedPayment === 'Wallet' &&
    !validateRequired('walletNumber')
  ){
    return;
  }

  const booking = getCurrentBookingData();

  if(
    state.selectedPayment === 'Parkin Wallet' &&
    state.walletBalance < booking.total
  ){
    toast('Not enough wallet balance');
    return;
  }

  const payload = {

    
    destinationId: booking.destination?.id || "",

    destinationName: booking.destination.name,

    destinationLocation: booking.destination.location,

    spot: booking.spot,

    spotType: booking.spotType,

    pricePerHour: booking.price,

    date: booking.date,

    timeIn: booking.time,

    hours: booking.hours,

    minutes: booking.minutes,

    durationText:
      `${booking.hours}h ${String(booking.minutes).padStart(2,"0")}m`,

    
    amount: Number(booking.total),

    paymentMethod: state.selectedPayment,

    paymentDetails: {

      cardholderName:
        document.getElementById('cardName')?.value || '',

      cardLast4:
        document.getElementById('cardNumber')
          ?.value
          ?.replace(/\D/g,'')
          .slice(-4) || '',

      walletNumber:
        document.getElementById('walletNumber')?.value || '',

      walletProvider:
        document.getElementById('walletProvider')?.value || ''
    }
  };

  try{

    const data = await apiRequest(
      '/payments/checkout',
      {
        method:'POST',
        body:JSON.stringify(payload)
      }
    );

    if(data.user){
      state.walletBalance =
        Number(data.user.walletBalance || 0);
    }

    const receipt = {
      id: data.booking?.receiptId || data.booking?._id,

      destination: booking.destination.name,

      location: booking.destination.location,

      spot: booking.spot,

      date: readableDate(booking.date),

      timeIn: booking.time,

      timeOut: addDuration(
        booking.time,
        booking.hours,
        booking.minutes
      ),

      duration:
        `${booking.hours}h ${String(booking.minutes).padStart(2,"0")}m`,

      amount: money(booking.total),

      payment: getReceiptPaymentLabel(),

      status: "active"
    };

    state.lastReceipt = receipt;

    state.history.unshift(receipt);

    saveState();

    toast("Payment successful");

    setTimeout(() => {
      navTo("confirmation.html");
    }, 500);

  }catch(e){

    toast(e.message || "Payment failed");
  }
}
async function renderDashboard(){ await loadBackendProfile(); await syncHistoryFromBackend(); setText('dashName',state.currentUser.name); setText('walletBalance',Number(state.walletBalance||0).toFixed(2)); setText('totalParkings',state.history.length); const el=document.getElementById('dashboardHistory'); if(el)el.innerHTML=state.history.slice(0,4).map((b,i)=>historyRow(b,i,false)).join('')||emptyHistory(); }
async function renderFullHistory(){ await syncHistoryFromBackend(); const el=document.getElementById('fullHistory'); if(el)el.innerHTML=state.history.map((b,i)=>historyRow(b,i,true)).join('')||emptyHistory(); }
async function cancelBooking(index){ const booking=state.history[index]; if(!booking)return; try{ await apiRequest(`/bookings/${encodeURIComponent(booking.id)}/cancel`,{method:'PATCH'}); booking.status='cancelled'; saveState(); renderFullHistory(); toast('Booking cancelled in MongoDB'); }catch(e){toast(e.message);} }
async function topUpWallet(){ const amount=Number(prompt('Enter top up amount in EGP:','100')); if(!amount||amount<=0)return; try{ const data=await apiRequest('/wallet/top-up',{method:'PATCH',body:JSON.stringify({amount})}); state.walletBalance=Number(data.walletBalance||0); saveState(); renderDashboard(); toast('Wallet topped up in MongoDB'); }catch(e){toast(e.message);} }
async function transferWallet(){ const amount=Number(prompt('Enter transfer amount in EGP:','50')); if(!amount||amount<=0)return; try{ const data=await apiRequest('/wallet/transfer',{method:'PATCH',body:JSON.stringify({amount})}); state.walletBalance=Number(data.walletBalance||0); saveState(); renderDashboard(); toast('Transfer saved in MongoDB'); }catch(e){toast(e.message);} }
async function initApp(){ loadState(); state.loggedIn=!!getToken()||state.loggedIn; await loadBackendProfile(); updateNav(); protectHomeClicks(); if(!protectPage())return; const page=document.body.dataset.page; renderFeatured(); if(page==='destinations')renderDestinations(); if(page==='details')initDetails(); if(page==='checkout')initCheckout(); if(page==='confirmation')renderReceipt(); if(page==='dashboard')renderDashboard(); if(page==='history')renderFullHistory(); }
document.addEventListener("DOMContentLoaded", initApp);