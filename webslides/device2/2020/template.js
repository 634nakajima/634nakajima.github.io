/*JSONファイル読み込み-----------------------------------------------------*/
const slideData = readJSON("./contents.json");
var thisorder = document.querySelector('article').getAttribute("order");
/*----------------------------------------------------------------------*/

/*スライド上部のヘッダ-----------------------------------------------------*/
var slideHeaderTemplate = document.querySelector('#slideHeaderTemplate').content;
var slideHeaderElements = document.getElementsByClassName("slideHeader");

for (let i = 0; i < slideHeaderElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(slideHeaderTemplate, true);// テンプレートのノードを複製
  const maintitle = clone.querySelector('p');// テンプレート内のp要素
  maintitle.innerHTML = slideData.maintitle + '</br >' + "第 " + slideData[thisorder].number + " 回 " + slideData[thisorder].subtitle;// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  slideHeaderElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業タイトル------------------------------------------------------------*/
var classTitleTemplate = document.querySelector('#titleTemplate').content;
var classTitleElements = document.getElementsByClassName("classTitle");

for (let i = 0; i < classTitleElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(classTitleTemplate, true);// テンプレートのノードを複製
  const titles = Array.from(clone.querySelectorAll('strong'));// テンプレート内のh5要素
  titles[0].innerHTML = "第" + slideData[thisorder].number + "回";
  titles[1].innerHTML = slideData[thisorder].subtitle;// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  classTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業内容リスト----------------------------------------------------------*/
var chapterTemplate = document.querySelector('#listTemplate').content;
var chapterElements = document.getElementsByClassName("classChapter");
const sections = Array.from(document.querySelectorAll('section'));

// それぞれHTMLに挿入
for (let i = 0; i < chapterElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(chapterTemplate, true);// テンプレートのノードを複製
  fragment.appendChild(clone.querySelector('ol'));// テンプレート内のol要素
  const ol = fragment.querySelector('ol');//fragment内のol要素
  ol.className = "chapter";
  console.log(sections.length);
  for (part of slideData[thisorder].part) {
    partClone = document.importNode(ol.querySelector('li'), true);
    const partTitle = partClone.querySelector('a');// テンプレート内のa要素
    partTitle.textContent = part.title;//授業内容を代入

    //授業パートトップスライドへのリンク
    const partIndex = sections.findIndex(({ className }) => (className.split(' ')[0].slice(4) - 1) === (slideData[thisorder].part.indexOf(part)));
    const titleIndex = sections.indexOf(chapterElements[0].closest("section"));
    const correctedIndex = (sections.length / 2 + partIndex - titleIndex + 1) % (sections.length / 2);
    partTitle.href = "#slide=" + correctedIndex;
    ol.appendChild(partClone);// 複製したノードをフラグメントに挿入
  }
  fragment.querySelector('li').remove();//テンプレートのliを削除
  chapterElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業内容タイトル------------------------------------------------------------*/
var partTitleTemplate = document.querySelector('#titleTemplate').content;
var partTitleElements = document.getElementsByClassName("partTitle");

for (let i = 0; i < partTitleElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(partTitleTemplate, true);// テンプレートのノードを複製
  const titles = Array.from(clone.querySelectorAll('strong'));// テンプレート内のh5要素
  const partNumber = partTitleElements.item(i).closest("section").className.split(' ')[0].slice(4) - 1;
  titles[1].innerHTML = slideData[thisorder].part[partNumber].title;// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  partTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*JSONファイルの読み込み---------------------------------------------------*/
function readJSON(path) {
  var f = path;
  var retJson;

  var obj = new XMLHttpRequest();

  obj.open('get', f, false); //ファイルオープン : 同期モード
  obj.onload = function () {
    try {
      retJson = JSON.parse(this.responseText); //JSON型でパース。
    } catch (e) {
      alert("コマンド定義ファイルの読み込み、解析に失敗しました。");
    }
  }
  obj.send(null); //ここで読込実行。
  return retJson;
}
/*----------------------------------------------------------------------*/