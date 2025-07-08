/**
 * フォーム自動化パターン
 * 
 * フォーム入力、ボタンクリック、選択などの自動化処理
 */

/**
 * 要素に安全にクリック実行
 * @param {string} selector - CSSセレクタ
 * @param {number} delay - クリック後の待機時間
 */
async function safeClick(selector, delay = 1000) {
  try {
    const element = await waitForElement(selector);
    element.click();
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Clicked: ${selector}`);
  } catch (error) {
    console.error(`Click failed: ${selector}`, error);
    throw error;
  }
}

/**
 * フォームに安全に値を入力
 * @param {string} selector - CSSセレクタ
 * @param {string} value - 入力値
 * @param {number} delay - 入力後の待機時間
 */
async function safeInput(selector, value, delay = 1000) {
  try {
    const element = await waitForElement(selector);
    element.val(value);
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Input: ${selector} = ${value}`);
  } catch (error) {
    console.error(`Input failed: ${selector}`, error);
    throw error;
  }
}

/**
 * セレクトボックスの選択
 * @param {string} selector - CSSセレクタ
 * @param {string} value - 選択値
 * @param {number} delay - 選択後の待機時間
 */
async function safeSelect(selector, value, delay = 1000) {
  try {
    const element = await waitForElement(selector);
    element.val(value);
    element.trigger('change');
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Selected: ${selector} = ${value}`);
  } catch (error) {
    console.error(`Select failed: ${selector}`, error);
    throw error;
  }
}

/**
 * ラジオボタンの選択
 * @param {string} selector - CSSセレクタ
 * @param {number} delay - 選択後の待機時間
 */
async function safeRadioSelect(selector, delay = 1000) {
  try {
    const element = await waitForElement(selector);
    element.prop('checked', true);
    element.trigger('change');
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Radio selected: ${selector}`);
  } catch (error) {
    console.error(`Radio select failed: ${selector}`, error);
    throw error;
  }
}

/**
 * チェックボックスの選択/解除
 * @param {string} selector - CSSセレクタ
 * @param {boolean} checked - チェック状態
 * @param {number} delay - 操作後の待機時間
 */
async function safeCheckbox(selector, checked = true, delay = 1000) {
  try {
    const element = await waitForElement(selector);
    element.prop('checked', checked);
    element.trigger('change');
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`Checkbox ${checked ? 'checked' : 'unchecked'}: ${selector}`);
  } catch (error) {
    console.error(`Checkbox failed: ${selector}`, error);
    throw error;
  }
}

/**
 * フォームデータの一括入力
 * @param {Object} formData - フォームデータオブジェクト
 * @param {number} delay - 各入力後の待機時間
 */
async function fillForm(formData, delay = 1000) {
  try {
    for (const [selector, value] of Object.entries(formData)) {
      if (value !== null && value !== undefined) {
        await safeInput(selector, value, delay);
      }
    }
    console.log('Form filled successfully');
  } catch (error) {
    console.error('Form fill failed:', error);
    throw error;
  }
}

/**
 * 複数のボタンを順次クリック
 * @param {string[]} selectors - CSSセレクタの配列
 * @param {number} delay - 各クリック後の待機時間
 */
async function clickSequence(selectors, delay = 1000) {
  try {
    for (const selector of selectors) {
      await safeClick(selector, delay);
    }
    console.log('Click sequence completed');
  } catch (error) {
    console.error('Click sequence failed:', error);
    throw error;
  }
}

/**
 * 条件付きクリック（要素が存在する場合のみクリック）
 * @param {string} selector - CSSセレクタ
 * @param {number} delay - クリック後の待機時間
 * @param {number} timeout - 要素待機のタイムアウト時間
 */
async function conditionalClick(selector, delay = 1000, timeout = 3000) {
  try {
    await waitForElement(selector, timeout);
    await safeClick(selector, delay);
    return true;
  } catch (error) {
    console.log(`Conditional click skipped: ${selector} (element not found)`);
    return false;
  }
}

// 使用例
// await safeClick('#login-button');
// await safeInput('#username', 'user@example.com');
// await safeSelect('#country', 'Japan');
// await fillForm({
//   '#email': 'sample@mail.com',
//   '#phone': '09012345678',
//   '#name': 'Sample User'
// });