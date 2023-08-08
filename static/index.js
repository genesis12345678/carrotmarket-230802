const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderDate = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const Div = document.createElement("div");
    Div.className = "item-list";

    const imageDiv = document.createElement("div");
    imageDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitle = document.createElement("div");
    InfoTitle.className = "item-list__info-title";
    InfoTitle.innerText = obj.title;

    const InfoMeta = document.createElement("div");
    InfoMeta.className = "item-list__info-meta";
    InfoMeta.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPrice = document.createElement("div");
    InfoPrice.className = "item-list__info-price";
    InfoPrice.innerText = obj.price + "원";

    imageDiv.appendChild(img);
    InfoDiv.appendChild(InfoTitle);
    InfoDiv.appendChild(InfoMeta);
    InfoDiv.appendChild(InfoPrice);
    Div.appendChild(imageDiv);
    Div.appendChild(InfoDiv);
    main.append(Div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderDate(data);
};

fetchList();
