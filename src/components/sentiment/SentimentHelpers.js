const sortObject = obj => {
  let newObj = [];
  for (let prop in obj) {
    let objs = {};
    if (typeof obj[prop] === 'object') {
      objs[prop] = obj[prop];
      newObj.push(objs);
    } else {
      objs[prop] = obj[prop];
      newObj.unshift(objs);
    }
  }
  let fObj = {};
  for (let prop1 in newObj) {
    for (let prop2 in newObj[prop1]) {
      fObj[prop2] = newObj[prop1][prop2];
    }
  }
  return fObj;
};

const detectlevelCurrentObj = obj => {
  let stIdx = '';
  for (let prop in obj) {
    let regex = /^l{1}[0-9]{1}$/;
    if (prop.includes('-st')) {
      stIdx = prop;
    } else if (typeof obj[prop] === 'object') {
      stIdx = prop;
    } else if (regex.test(prop)) {
      stIdx = obj[prop];
      if (prop === 'l4') {
        stIdx = prop;
        if (obj[stIdx] === 'data') {
          stIdx = 'data';
        }
      }
    }
  }
  return stIdx;
};

const detectlvlHeading = obj => {
  var stIdx = '';
  for (var prop in obj) {
    // var regex = /^[a-zA-Z]{1}[0-9]{1}$/;
    if (prop === 'l2' || prop === 'l3') {
      stIdx = prop;
    }
  }
  return stIdx;
};

const visitOutlineObjTable = (acc, obj, lvl, path) => {
  if (lvl > 5) return;
  lvl += 1;
  obj = sortObject(obj);
  // $i = 0;
  if(obj["l1-ht"] && obj["l1-ht"].includes(".htm")){
    obj["l1-ht"] = obj["l1"]
  }
  for (let prop in obj) {
    let detectedLevel = detectlevelCurrentObj(obj);
    if (detectedLevel === 'l4' || detectedLevel.includes('-st')) {
      let virtualDiv = obj[detectedLevel];
      if (virtualDiv) {
        let vHeadingElem = virtualDiv.includes('<heading class=');
        if (vHeadingElem) {
          const extractValueInsideQuote = virtualDiv.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, '');
          if (extractValueInsideQuote.includes('heading')) {
            const removeClass = virtualDiv.replace(' class=', '');
            const removeDoubleQuotes = removeClass.replace(/['"]+/g, '');
            const removeHeading = removeDoubleQuotes.replace(extractValueInsideQuote, '');
            let result = removeHeading.match(/<heading>(.*?)<\/heading>/g).map(function(val) {
              return val.replace(/<\/?heading>/g, '');
            });
            detectedLevel = extractValueInsideQuote;
            obj['l4-ht'] = result[0];
          }
        }
      }
    }
    let li = {};
    if (prop.includes('-ht') || (detectedLevel === "ex" && prop==="l1")) {
      if(prop.includes('-ht') && detectedLevel === "ex"){
        continue;
      }
      prop = obj[prop];
      path += 'id' + detectedLevel.replaceAll(' ', '_').replaceAll('.', '');
      path = path.toLowerCase();
      var detectlvlHdng = detectlvlHeading(obj);
      if (detectlvlHdng) {
        if(detectedLevel === "ex"){
          prop = obj[detectlvlHdng];
        } else {
          prop = obj[detectlvlHdng + '-ht'];
        }
      }
      if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
        if (lvl === 1 && prop.includes('.htm')) {
        } else {
          li = { path, lvl, prop };
          acc.push(li);
        }
      }
    }
    if (typeof obj[prop] === 'object') {
      visitOutlineObjTable(acc, obj[prop], lvl, path);
    } else {
    }
  }
};

const titleCase = str => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

const detectObjFromCurrentObj = obj => {
  let ObjIdx = '';
  for (let prop in obj) {
    if (typeof obj[prop] === 'object') {
      ObjIdx = prop;
    }
  }
  return ObjIdx;
};

const detectSecTextFromCurrentObj = obj => {
  let stIdx = '';
  for (let prop in obj) {
    let regex = /^[a-zA-Z]{1}[0-9]{1}$/;
    if (prop.includes('-st') || regex.test(prop) || prop === 'data') {
      stIdx = prop;
      if (obj[prop] === 'data') {
        stIdx = 'data';
      }
    }
  }
  return stIdx;
};

const visitOutlineObj = (acc, obj, lvl, path) => {
  lvl += 1;
  if(obj["ex"] || (obj["l1-ht"] && obj["l1-ht"].includes(".htm"))){
    obj["l1-ht"] = obj["l1"]
  }
  for (let prop in obj) {
    let removeHeadingFromContent;
    let detectedLevel = detectlevelCurrentObj(obj);
    let headingLevelDetected = false;
    if (detectedLevel === 'l4' || detectedLevel.includes('-st')) {
      let virtualDiv = obj[detectedLevel];
      if (virtualDiv) {
        let vHeadingElem = virtualDiv.includes('<heading class=');
        if (vHeadingElem) {
          const extractQuote = virtualDiv.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, '');
          if (extractQuote.includes('heading')) {
            const removeClass = virtualDiv.replace(' class=', '');
            const removeDoubleQuotes = removeClass.replace(/['"]+/g, '');
            const removeHeading = removeDoubleQuotes.replace(extractQuote, '');
            let result = removeHeading.match(/<heading>(.*?)<\/heading>/g).map(function(val) {
              return val.replace(/<\/?heading>/g, '');
            });
            detectedLevel = extractQuote;
            headingLevelDetected = true;
            result.forEach(v => {
              removeHeadingFromContent = v;
              obj['l4-ht'] = v;
            });
          }
        }
      }
    }
    let li = {};
    if (!isNaN(prop)) {
      visitOutlineObj(acc, obj[prop], lvl, path);
    }
    if (prop.includes('ht')) {
      prop = obj[prop];
      let objIdx = detectObjFromCurrentObj(obj);
      let stIdx = detectSecTextFromCurrentObj(obj);
      if (headingLevelDetected) {
        path += 'id' + detectedLevel.replaceAll(' ', '_').toLowerCase();
      } else {
        path +=
          'id' +
          detectedLevel
            .replaceAll(' ', '_')
            .replaceAll('.', '')
            .toLowerCase();
      }
      path = path.toLowerCase();
      if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
        if (lvl === 1 && prop.includes('.htm')) {
        } else {
          li = { path, lvl, prop: titleCase(prop) };
          acc.push(li);
        }
      }
      if (typeof obj[objIdx] === 'object') {
        visitOutlineObj(acc, obj[objIdx], lvl, path);
      } else {
        if (prop !== 'Headingtag' && prop !== 'Sectiontext' && obj[stIdx]) {
          let content = obj[stIdx].replaceAll('\n', '<br/>');
          li = { path, lvl: lvl + 2, prop, content: content.replace(removeHeadingFromContent, '') };
          acc.push(li);
        }
      }
    }
  }
};

const isHtmlTag = str => {
  return !(str || '')
    // replace html tag with content
    .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '')
    // remove remaining self closing tags
    .replace(/(<([^>]+)>)/gi, '')
    // remove extra space at start and end
    .trim();
};

const removeHeadingTags = content => {
  let isHeadingClass = content.includes('<heading class=');
  let isHeadingTag = content.includes('</heading>');
  let newContent = content;
  const isHtml = isHtmlTag(content);
  if (!isHtml) {
    newContent = `<span>${content}</span>`;
  }

  if (isHeadingClass && isHeadingTag) {
    let startText = content.indexOf('<heading class=');
    let endText = content.indexOf('</heading>');
    let removeText = content.slice(startText, endText + 10);
    newContent = content.replace(removeText, '');
  }
  return newContent;
};

const getSentimentSettings = () => {
  const settings = JSON.parse(localStorage.getItem('sentimentSetting'));

  return settings;
};

const saveSentimentSettings = setting => {
  localStorage.setItem('sentimentSetting', JSON.stringify(setting));
};

export { getSentimentSettings, saveSentimentSettings, visitOutlineObjTable, visitOutlineObj, removeHeadingTags };
