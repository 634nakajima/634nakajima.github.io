/*template要素の書き出し--------------------------------------------------*/
document.write(
  //目次へ戻るバナー
  '<template id="bannerTemplate">',
  '<header role="banner">',
  '<nav role="navigation">',
  '<a href="index.html#slide=2" title="目次へ戻る">',
  '&lt; 目次へ戻る',
  '</a>',
  '</nav>',
  '</header>',
  '</template>',
  //スライド上部のヘッダ
  '<template id="slideHeaderTemplate">',
  '<p class="text-context"></p><br>',
  '</template>',
  //授業タイトル
  '<template id=titleTemplate>',
  '<div class="aligncenter">',
  '<h2 class="text-landing"><strong></strong></h2>',
  '<h2 class="text-landing"><strong></strong></h2>',
  '<hr>',
  '</div>',
  '</template>',
  //授業内容リスト
  '<template id="listTemplate">',
  '<div class="aligncenter">',
  '<ol>',
  '<li>',
  '<h5><a></a></h5>',
  '</li>',
  '</ol>',
  '</div>',
  '</template>',
  //例題
  '<template id="exerciseTemplate">',
  '<h4><strong></strong></h4>',
  '<h3></h3>',
  '</template>',
  //説明
  '<template id="explanationTemplate">',
  '<h4><strong>見出し</strong></h4>',
  '<h3>説明</h3>',
  '</template>',
  //YouTube
  '<template id="youtubeTemplate">',
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZTXUvYVAnoI" frameborder="0"',
  'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>',
  '</iframe>',
  '</template>'
);
/*----------------------------------------------------------------------*/

/*JSONの読み込みと授業回の取得----------------------------------------------*/
const slideData = readJSON("./contents.json");
var thisorder = document.querySelector('article').getAttribute("order");
const sections = Array.from(document.querySelectorAll('section'));
const explanations = Array.from(document.getElementsByClassName("explanation"));
/*----------------------------------------------------------------------*/

/*目次へ戻るバナー---------------------------------------------------------*/
var bannerTemplate = document.querySelector('#bannerTemplate').content;
var bannerElement = document.getElementById("banner");
if (bannerElement) bannerElement.appendChild(document.importNode(bannerTemplate, true));
/*----------------------------------------------------------------------*/

/*スライド上部のヘッダ-----------------------------------------------------*/
var slideHeaderTemplate = document.querySelector('#slideHeaderTemplate').content;
var slideHeaderElements = document.getElementsByClassName("slideHeader");

for (let i = 0; i < slideHeaderElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(slideHeaderTemplate, true);// テンプレートのノードを複製
  const classtitle = clone.querySelector('p');// テンプレート内のp要素
  classtitle.innerHTML = slideData.maintitle + '</br >' + "第 " + slideData[thisorder].number + " 回 " + slideData[thisorder].classtitle;// テンプレートの要素に適用する
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
  titles[1].innerHTML = slideData[thisorder].classtitle;// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  classTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業チャプターリスト------------------------------------------------------*/
var chapterTemplate = document.querySelector('#listTemplate').content;
var chapterElements = document.getElementsByClassName("chapterList");

// それぞれHTMLに挿入
for (let i = 0; i < chapterElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(chapterTemplate, true);// テンプレートのノードを複製

  fragment.appendChild(clone);// テンプレート内のol要素
  const ol = fragment.querySelector('ol');//fragment内のol要素
  ol.className = "chapter";
  for (chapter of slideData[thisorder].chaptertitle) {
    chapterClone = document.importNode(ol.querySelector('li'), true);
    const chapterTitle = chapterClone.querySelector('a');// テンプレート内のa要素
    chapterTitle.textContent = chapter;//授業内容を代入

    //授業チャプタートップスライドへのリンク
    const chapterIndex = 1 + sections.findIndex(({ className }) => (
      className.split(' ')[0].slice(String("chapter").length) - 1)
      === (slideData[thisorder].chaptertitle.indexOf(chapter))
    );
    chapterTitle.href = "#slide=" + chapterIndex;
    ol.appendChild(chapterClone);// 複製したノードをフラグメントに挿入
  }

  fragment.querySelector('li').remove();//テンプレートのliを削除
  chapterElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業チャプタータイトル----------------------------------------------------*/
var chapterTitleTemplate = document.querySelector('#titleTemplate').content;
var chapterTitleElements = document.getElementsByClassName("chapterTitle");

for (let i = 0; i < chapterTitleElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(chapterTitleTemplate, true);// テンプレートのノードを複製
  const titles = Array.from(clone.querySelectorAll('strong'));// テンプレート内のh5要素
  const chapterNumber = chapterTitleElements.item(i).closest("section").className.split(' ')[0].slice(String("chapter").length) - 1;
  titles[1].innerHTML = slideData[thisorder].chaptertitle[chapterNumber];// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  chapterTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*科目パートタイトル-------------------------------------------------------*/
var partTitleTemplate = document.querySelector('#titleTemplate').content;
var partTitleElements = document.getElementsByClassName("partTitle");

for (let i = 0; i < partTitleElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(partTitleTemplate, true);// テンプレートのノードを複製
  const titles = Array.from(clone.querySelectorAll('strong'));// テンプレート内のh5要素
  const partNumber = partTitleElements.item(i).closest("section").className.split(' ')[0].slice(String("part").length) - 1;
  titles[1].innerHTML = slideData.parttitle[partNumber];// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  partTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*例題-------------------------------------------------------------------*/
var exerciseTemplate = document.querySelector('#exerciseTemplate').content;
var exerciseElements = document.getElementsByClassName("exercise");

for (let i = 0; i < exerciseElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(exerciseTemplate, true);// テンプレートのノードを複製
  const title = clone.querySelector('strong');// テンプレート内のstrong要素
  const sentence = clone.querySelector('h3');
  title.innerHTML = '例題 ' + (i + 1);// テンプレートの要素に適用する
  sentence.innerHTML = slideData[thisorder].exercise[i];// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  exerciseElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*説明-------------------------------------------------------------------*/
var explanationTemplate = document.querySelector('#explanationTemplate').content;
var explanationElements = document.getElementsByClassName("explanation");

for (let i = 0; i < explanationElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(explanationTemplate, true);// テンプレートのノードを複製
  const title = clone.querySelector('strong');// テンプレート内のstrong要素
  const sentence = clone.querySelector('h3');
  title.innerHTML = slideData[thisorder].explanation[i][0];// テンプレートの要素に適用する
  sentence.innerHTML = slideData[thisorder].explanation[i][1];// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  explanationElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*YouTube-------------------------------------------------------------------*/
var youtubeTemplate = document.querySelector('#youtubeTemplate').content;
var youtubeElements = document.getElementsByClassName("youtube");

for (let i = 0; i < youtubeElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(youtubeTemplate, true);// テンプレートのノードを複製
  const iframe = clone.querySelector('iframe');// テンプレート内のstrong要素
  const closestExplanation = youtubeElements.item(i).closest("section").getElementsByClassName("explanation");
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation[0]);
  iframe.setAttribute("src", slideData[thisorder].explanation[indexOfClosestExplanation][2].youtube);
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  youtubeElements.item(i).appendChild(fragment);
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