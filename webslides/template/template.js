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
  '</template>',
  //Unsplash
  '<template id="unsplashTemplate">',
  '<img class="aligncenter" src="https://source.unsplash.com/q10VITrVYUM/480x360" alt="image">',
  '</template>',
  //list
  '<template id="listTemplate">',
  '<li>',
  '<h5>item</h5>',
  '</li>',
  '</template>',
  //gridSection
  '<template id="gridSectionTemplate">',
  '<div class="wrap">',
  '<div class="slideHeader"></div>',
  '<div class="explanation"></div>',
  '<div class="grid sm">',
  '<div class="column">',
  '<div class="unsplash"></div>',
  '</div>',
  '<div class="column">',
  '<ul class="flexblock specs">',
  '</ul>',
  '</div>',
  '</div>',
  '</div>',
  '</template>',
  //youtubeSection
  '<template id="youtubeSectionTemplate">',
  '  <div class="wrap">',
  '    <div class="slideHeader"></div>',
  '    <div class="explanation"></div>',
  '    <div class="content-left">',
  '      <ul class="flexblock specs">',
  '      </ul>',
  '    </div>',
  '    <div class="content-left">',
  '      <div class="youtube"></div>',
  '    </div>',
  '  </div>',
  '</template>',
  //mySection
  '<template id="mySectionTemplate">',
  '  <div class="wrap">',
  '    <div class="slideHeader"></div>',
  '    <div class="explanation"></div>',
  '  </div>',
  '</template>',
  '<template id="myChapterTitleTemplate">',
  '<div class="wrap">',
  '<div class="slideHeader"></div>',
  '<div class="chapterTitle"></div>',
  '</div>',
  '</template>',
  '</template>',
  '<template id="myClassTitleTemplate">',
  '<div class="wrap">',
  '<div class="slideHeader"></div>',
  '<div class="classTitle"></div>',
  '<div class="chapterList"></div>',
  '</div>',
  '</template>'
);
/*----------------------------------------------------------------------*/

/*JSONの読み込みと授業回の取得----------------------------------------------*/
const slideData = readJSON("./contents.json");
var thisorder = document.querySelector('article').getAttribute("order");
const sections = Array.from(document.querySelectorAll('section'));
/*----------------------------------------------------------------------*/

/*目次へ戻るバナー---------------------------------------------------------*/
var bannerTemplate = document.querySelector('#bannerTemplate').content;
var bannerElement = document.getElementById("banner");
if (bannerElement) bannerElement.appendChild(document.importNode(bannerTemplate, true));
/*----------------------------------------------------------------------*/

/*マイクラスタイトル   ----------------------------------------------------*/
var myClassTitleTemplate = document.querySelector('#myClassTitleTemplate').content;
var myClassTitleElements = document.getElementsByClassName("myClassTitle");
for (let i = 0; i < myClassTitleElements.length; i++) {
  const clone = document.importNode(myClassTitleTemplate, true);// テンプレートのノードを複製
  myClassTitleElements.item(i).appendChild(clone);
}
/*----------------------------------------------------------------------*/

/*マイチャプタータイトル----------------------------------------------------*/
var myChapterTitleTemplate = document.querySelector('#myChapterTitleTemplate').content;
var myChapterTitleElements = document.getElementsByClassName("myChapterTitle");
for (let i = 0; i < myChapterTitleElements.length; i++) {
  const clone = document.importNode(myChapterTitleTemplate, true);// テンプレートのノードを複製
  myChapterTitleElements.item(i).appendChild(clone);
}
/*----------------------------------------------------------------------*/

/*マイセクション----------------------------------------------------------*/
var mySectionTemplate = document.querySelector('#mySectionTemplate').content;
var mySectionElements = document.getElementsByClassName("mySection");

for (let i = 0; i < mySectionElements.length; i++) {
  const clone = document.importNode(mySectionTemplate, true);// テンプレートのノードを複製
  mySectionElements.item(i).appendChild(clone);
}
/*----------------------------------------------------------------------*/

/*グリッドセクション-------------------------------------------------------*/
var gridSectionTemplate = document.querySelector('#gridSectionTemplate').content;
var gridSectionElements = document.getElementsByClassName("gridSection");

for (let i = 0; i < gridSectionElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(gridSectionTemplate, true);// テンプレートのノードを複製
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  gridSectionElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*YouTubeセクション-------------------------------------------------------*/
var youtubeSectionTemplate = document.querySelector('#youtubeSectionTemplate').content;
var youtubeSectionElements = document.getElementsByClassName("youtubeSection");

for (let i = 0; i < youtubeSectionElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(youtubeSectionTemplate, true);// テンプレートのノードを複製
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  youtubeSectionElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*スライド上部のヘッダ-----------------------------------------------------*/
var slideHeaderTemplate = document.querySelector('#slideHeaderTemplate').content;
var slideHeaderElements = document.getElementsByClassName("slideHeader");

for (let i = 0; i < slideHeaderElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(slideHeaderTemplate, true);// テンプレートのノードを複製
  const classtitle = clone.querySelector('p');// テンプレート内のp要素
  let title = slideData.maintitle + '</br >'
  if ('number' in slideData[thisorder]) title += "第 " + slideData[thisorder].number + " 回 "
  title += slideData[thisorder].classtitle
  classtitle.innerHTML = title// テンプレートの要素に適用する
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
  if ('number' in slideData[thisorder]) titles[0].innerHTML = "第" + slideData[thisorder].number + "回";
  titles[1].innerHTML = slideData[thisorder].classtitle;// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  classTitleElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業チャプターリスト------------------------------------------------------*/
var chapterTemplate = document.querySelector('#listTemplate').content;
var chapterElements = document.getElementsByClassName("chapterList");
var chapterTitleElements = document.getElementsByClassName("chapterTitle");

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
    const chapterTitleIndex = slideData[thisorder].chaptertitle.indexOf(chapter)
    if (chapterTitleElements.item(chapterTitleIndex)) {
      const chapterTitleSection = chapterTitleElements.item(chapterTitleIndex).closest("section");
      const chapterIndex = 1 + sections.indexOf(chapterTitleSection)
      chapterTitle.href = "#slide=" + chapterIndex;
    }
    ol.appendChild(chapterClone);// 複製したノードをフラグメントに挿入
  }

  fragment.querySelector('li').remove();//テンプレートのliを削除
  chapterElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*授業チャプタータイトル----------------------------------------------------*/
var chapterTitleTemplate = document.querySelector('#titleTemplate').content;

for (let i = 0; i < chapterTitleElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(chapterTitleTemplate, true);// テンプレートのノードを複製
  const titles = Array.from(clone.querySelectorAll('strong'));// テンプレート内のh5要素
  titles[1].innerHTML = slideData[thisorder].chaptertitle[i];// テンプレートの要素に適用する
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
const classData = slideData[thisorder].json == undefined ? slideData[thisorder] : readJSON(slideData[thisorder].json)

for (let i = 0; i < explanationElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(explanationTemplate, true);// テンプレートのノードを複製
  if (classData.explanation.length <= i) break;
  const title = clone.querySelector('strong');// テンプレート内のstrong要素
  const sentence = clone.querySelector('h3');
  title.innerHTML = classData.explanation[i][0];// テンプレートの要素に適用する
  sentence.innerHTML = classData.explanation[i][1];// テンプレートの要素に適用する
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  explanationElements.item(i).appendChild(fragment);
}
const explanations = Array.from(document.getElementsByClassName("explanation"));
/*----------------------------------------------------------------------*/

/*YouTube---------------------------------------------------------------*/
var youtubeTemplate = document.querySelector('#youtubeTemplate').content;
var youtubeElements = document.getElementsByClassName("youtube");

for (let i = 0; i < youtubeElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(youtubeTemplate, true);// テンプレートのノードを複製
  const iframe = clone.querySelector('iframe');// テンプレート内のstrong要素
  const closestExplanation = youtubeElements.item(i).closest("section").getElementsByClassName("explanation");
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation[0]);
  iframe.setAttribute("src", classData.explanation[indexOfClosestExplanation][2].youtube);
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  youtubeElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*Unsplash--------------------------------------------------------------*/
var unsplashTemplate = document.querySelector('#unsplashTemplate').content;
var unsplashElements = document.getElementsByClassName("unsplash");

for (let i = 0; i < unsplashElements.length; i++) {
  const fragment = document.createDocumentFragment();// フラグメント
  const clone = document.importNode(unsplashTemplate, true);// テンプレートのノードを複製
  const img = clone.querySelector('img');// テンプレート内のstrong要素
  const closestExplanation = unsplashElements.item(i).closest("section").getElementsByClassName("explanation");
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation[0]);
  img.setAttribute("src", classData.explanation[indexOfClosestExplanation][2].unsplash);
  fragment.appendChild(clone);// 複製したノードをフラグメントに挿入
  unsplashElements.item(i).appendChild(fragment);
}
/*----------------------------------------------------------------------*/

/*list------------------------------------------------------------------*/
for (let i = 0; i < gridSectionElements.length; i++) {
  const ul = gridSectionElements.item(i).querySelector('ul')
  const closestExplanation = gridSectionElements.item(i).closest("section").getElementsByClassName("explanation");
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation[0]);
  for (let content of classData.explanation[indexOfClosestExplanation][2].list) {
    ul.insertAdjacentHTML('beforeend', '<li><h5>' + content + '</h5></li>')
  }
}
for (let i = 0; i < youtubeSectionElements.length; i++) {
  const ul = youtubeSectionElements.item(i).querySelector('ul')
  const closestExplanation = youtubeSectionElements.item(i).closest("section").getElementsByClassName("explanation");
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation[0]);
  for (let content of classData.explanation[indexOfClosestExplanation][2].list) {
    ul.insertAdjacentHTML('beforeend', '<li><h5>' + content + '</h5></li>')
  }
}
/*----------------------------------------------------------------------*/


/*マイセクション----------------------------------------------------------*/
for (let i = 0; i < mySectionElements.length; i++) {
  const wrap = mySectionElements.item(i).getElementsByClassName("explanation")[0]
  const closestExplanation = mySectionElements.item(i).closest("section").getElementsByClassName("explanation")[0]
  const indexOfClosestExplanation = explanations.indexOf(closestExplanation)
  if (classData.explanation.length <= indexOfClosestExplanation) break
  const contents = classData.explanation[indexOfClosestExplanation][2]
  if (contents == undefined) continue
  else if ('image' in contents) {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="grid sm"><div class="column"><img class="aligncenter" src="https://source.unsplash.com/q10VITrVYUM/480x360" alt="image"></div><div class="column"><ul class="flexblock specs"></ul></div></div>')
    const img = wrap.querySelector('img')
    img.setAttribute("src", contents.image)
    if ('caption' in contents) {
      img.insertAdjacentHTML("afterend", contents.caption)
    }
  } else if ('youtube' in contents) {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="content-left"><ul class="flexblock specs"></ul></div><div class="content-left"><div class="embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/ZTXUvYVAnoI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>')
    const iframe = wrap.querySelector('iframe')
    iframe.setAttribute("src", contents.youtube)
  } else if ('embed' in contents) {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="content-left"><ul class="flexblock specs"></ul></div><div class="content-left"><div class="embed"></div></div></div>')
    const embed = wrap.getElementsByClassName('embed')[0]
    embed.insertAdjacentHTML('beforeend', contents.embed)
  } else if ('code' in contents) {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="content-left"><ul class="flexblock specs"></ul></div><div class="content-left"><pre style="max-height: 400px;white-space: pre;"><code class="prettyprint lang-js"></code></pre></div>')
    const code = wrap.querySelector('code')
    code.insertAdjacentHTML('beforeend', contents.code)
  } else if ('codepen' in contents) {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="content-left"><ul class="flexblock specs"></ul></div><div class="content-left"><iframe height="360" style="width: 100%;" scrolling="no" title="template" src="https://codepen.io/634nakajimaMejiro/embed/dyGbxgp?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href="https://codepen.io/634nakajimaMejiro/pen/dyGbxgp">template</a> by 中島 武三志 (<a href="https://codepen.io/634nakajimaMejiro">@634nakajimaMejiro</a>) on <a href="https://codepen.io">CodePen</a>.</iframe></div>')
    const codepen = wrap.querySelector('iframe')
    if (contents.codepen.indexOf('css') >= 0) {
      codepen.setAttribute("src", "https://codepen.io/" + contents.codepen[0] + "/embed/" + contents.codepen[1] + "?height=265&theme-id=dark&default-tab=css,result")
    } else {
      codepen.setAttribute("src", "https://codepen.io/" + contents.codepen[0] + "/embed/" + contents.codepen[1] + "?height=265&theme-id=dark&default-tab=html,result")
    }
    if ('caption' in contents) {
      codepen.insertAdjacentHTML("afterend", contents.caption)
    }
  } else {
    wrap.insertAdjacentHTML('beforeend',
      '<div class="content-left"><ul class="flexblock specs"></ul></div><div class="content-left"></div>')
  }

  if (contents.list == undefined) continue
  const ul = wrap.querySelector('ul');
  for (let content of classData.explanation[indexOfClosestExplanation][2].list) {
    ul.insertAdjacentHTML('beforeend', '<li><h5>' + content + '</h5></li>')
  }
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