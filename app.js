console.log("extension running");
let backdrop = document.getElementsByClassName("backdrop")[0];
let contests = document.getElementsByClassName("contests")[0];
let challenges = document.getElementById("challenges");

let userhandle;
let user = document.getElementById("User");
let rating = document.getElementById("rating");
let maxrating = document.getElementById("maxrating");
let rank = document.getElementById("rank");
let maxrank = document.getElementById("maxrank");
let userimg = document.getElementById("userimg");
let fetchBtn = document.getElementById("fetchdata");
let quitBtn = document.getElementById("quit");
document.getElementsByTagName("form")[0].addEventListener("submit", (e) => { e.preventDefault();})
fetchBtn.addEventListener("click", () => {
    console.log("fetching");
    userhandle = document.getElementById("userhandle").value;
    if (userhandle.trim() === "") {
        alert("please use a valid UserHandle");
        return;
    }
    fetchData(userhandle);
    localStorage.setItem("userHandle", userhandle);
}); 

const fetchContests = async () => {
    const url = `https://codeforces.com/api/contest.list`;
    const data = await fetch(url);
    const contestsdata = data.json();
    let contestss=[];
    contestsdata.then((value) => {
        contestss = value.result.filter((contest => {
            return contest.phase === "BEFORE";
        }));
        for (let i = contestss.length-1; i >= 0&&i>=contestss.length-10; i--){
            let x = contestss[i];
            var myDate = new Date(1000 * x.startTimeSeconds);
            contests.innerHTML += `<div class="card">
            <div class="column">
                <h2>${x.name}</h2>
                <div class="row">
                    <h3>${myDate.toLocaleDateString()}</h3><h3>${
              x.durationSeconds / 3600
            } hr</h3>
                    </div>
            </div>
            </div>`;
        }

        console.log(contestss);
    })
    // console.log(contestsdata);
}
const fetchData = async (User)=>{
    const url = `https://codeforces.com/api/user.info?handles=${User}`;
    const data = await fetch(url);
    const result = data.json();
    console.log(result);
    fetchContests();
  
       
    let userdata = {
      result: { handle: "", rating: "", rank: "", avatar: "", "maxRating":"","maxRank":"" },
    };
    result.then((value => {
        if (value.status !== "OK") {
            alert("user not exist");
            return;
        }
          document.getElementsByTagName("form")[0].style.display = "none";
          document.getElementById("UserData").style.display = "flex";
        userdata = { ...userdata, result: value.result[0] }
        console.log(userdata);
        user.innerText = userdata.result.handle;
        rating.innerText = "Rating : " + userdata.result.rating;
        maxrating.innerText = "Max Rating : " + userdata.result.maxRating;
        rank.innerText = "Rank : "+userdata.result.rank;
        maxrank.innerText ="Max Rank : "+ userdata.result.maxRank;
        userimg.setAttribute("src",userdata.result.avatar)  ;
    }))

   
}
if (localStorage.getItem("userHandle")) {
    fetchData(localStorage.getItem("userHandle"));
  
}
quitBtn.onclick = () => {
      document.getElementsByTagName("form")[0].style.display = "flex";
    document.getElementById("UserData").style.display = "none";
    localStorage.removeItem("userHandle");
}
challenges.onclick = () => {
    backdrop.style.display = "block";
    contests.style.display = "block";
}
let back = document.getElementById("backBtn");
const backListner = () => {
    backdrop.style.display = "none";
    contests.style.display = "none";
}
backdrop.onclick = backListner;
