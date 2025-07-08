/**
 * 要素待機パターン
 * 
 * DOM要素の出現やページロードを待機するための関数群
 */

/**
 * 要素が表示されるまで待機
 * @param {string} selector - CSSセレクタ
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @returns {Promise<jQuery>} - 見つかった要素
 */
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkElement = () => {
      const element = $(selector);
      if (element.length > 0) {
        console.log(`Element found: ${selector}`);
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element not found: ${selector} (timeout: ${timeout}ms)`));
      } else {
        setTimeout(checkElement, 100);
      }
    };
    
    checkElement();
  });
}

/**
 * 複数の要素のうち、いずれかが表示されるまで待機
 * @param {string[]} selectors - CSSセレクタの配列
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @returns {Promise<{element: jQuery, selector: string}>} - 見つかった要素とセレクタ
 */
function waitForAnyElement(selectors, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkElements = () => {
      for (const selector of selectors) {
        const element = $(selector);
        if (element.length > 0) {
          console.log(`Element found: ${selector}`);
          resolve({ element, selector });
          return;
        }
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`No elements found: ${selectors.join(', ')} (timeout: ${timeout}ms)`));
      } else {
        setTimeout(checkElements, 100);
      }
    };
    
    checkElements();
  });
}

/**
 * ページロード完了を待機
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 */
function waitForPageLoad(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkLoad = () => {
      if (document.readyState === 'complete') {
        console.log('Page load complete');
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Page load timeout'));
      } else {
        setTimeout(checkLoad, 100);
      }
    };
    
    checkLoad();
  });
}

/**
 * 要素のテキストが変更されるまで待機
 * @param {string} selector - CSSセレクタ
 * @param {string} expectedText - 期待するテキスト
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 */
function waitForTextChange(selector, expectedText, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkText = () => {
      const element = $(selector);
      if (element.length > 0 && element.text().includes(expectedText)) {
        console.log(`Text changed: ${selector} = ${expectedText}`);
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Text not changed: ${selector} (timeout: ${timeout}ms)`));
      } else {
        setTimeout(checkText, 100);
      }
    };
    
    checkText();
  });
}

/**
 * 要素が消失するまで待機
 * @param {string} selector - CSSセレクタ
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 */
function waitForElementToDisappear(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkDisappear = () => {
      const element = $(selector);
      if (element.length === 0) {
        console.log(`Element disappeared: ${selector}`);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element still exists: ${selector} (timeout: ${timeout}ms)`));
      } else {
        setTimeout(checkDisappear, 100);
      }
    };
    
    checkDisappear();
  });
}

// 使用例
// const loginButton = await waitForElement('#login-button');
// await waitForPageLoad();
// await waitForTextChange('#status', 'ログイン完了');