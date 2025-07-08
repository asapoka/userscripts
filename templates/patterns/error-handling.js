/**
 * エラーハンドリングパターン
 * 
 * 堅牢なエラーハンドリングとリトライ機能
 */

/**
 * リトライ機能付き関数実行
 * @param {Function} fn - 実行する関数
 * @param {number} maxAttempts - 最大試行回数
 * @param {number} delay - 試行間の待機時間（ミリ秒）
 * @param {string} operationName - 操作名（ログ用）
 */
async function retryOperation(fn, maxAttempts = 3, delay = 2000, operationName = 'Operation') {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`${operationName} attempt ${attempt}/${maxAttempts}`);
      const result = await fn();
      console.log(`${operationName} succeeded on attempt ${attempt}`);
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`${operationName} failed on attempt ${attempt}:`, error.message);
      
      if (attempt < maxAttempts) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error(`${operationName} failed after ${maxAttempts} attempts`);
  throw lastError;
}

/**
 * タイムアウト機能付き関数実行
 * @param {Function} fn - 実行する関数
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @param {string} operationName - 操作名（ログ用）
 */
async function withTimeout(fn, timeout = 30000, operationName = 'Operation') {
  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeout}ms`));
    }, timeout);
    
    try {
      const result = await fn();
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

/**
 * 安全な要素操作（エラーハンドリング付き）
 * @param {string} selector - CSSセレクタ
 * @param {Function} operation - 実行する操作
 * @param {string} operationName - 操作名
 * @param {number} maxAttempts - 最大試行回数
 */
async function safeElementOperation(selector, operation, operationName = 'Element operation', maxAttempts = 3) {
  return await retryOperation(async () => {
    const element = await waitForElement(selector);
    if (!element || element.length === 0) {
      throw new Error(`Element not found: ${selector}`);
    }
    
    return await operation(element);
  }, maxAttempts, 1000, operationName);
}

/**
 * 条件付き操作実行
 * @param {Function} condition - 条件チェック関数
 * @param {Function} operation - 実行する操作
 * @param {Function} fallback - 条件が満たされない場合の処理
 * @param {string} operationName - 操作名
 */
async function conditionalOperation(condition, operation, fallback = null, operationName = 'Conditional operation') {
  try {
    const conditionResult = await condition();
    if (conditionResult) {
      console.log(`${operationName}: condition met, executing operation`);
      return await operation();
    } else {
      console.log(`${operationName}: condition not met`);
      if (fallback) {
        console.log(`${operationName}: executing fallback`);
        return await fallback();
      }
    }
  } catch (error) {
    console.error(`${operationName} failed:`, error);
    if (fallback) {
      console.log(`${operationName}: executing fallback due to error`);
      return await fallback();
    }
    throw error;
  }
}

/**
 * 複数の操作を順次実行（1つ失敗しても継続）
 * @param {Array} operations - 操作の配列 [{fn: Function, name: string}]
 * @param {boolean} stopOnError - エラー時に停止するかどうか
 */
async function executeSequence(operations, stopOnError = false) {
  const results = [];
  const errors = [];
  
  for (const { fn, name } of operations) {
    try {
      console.log(`Executing: ${name}`);
      const result = await fn();
      results.push({ name, result, success: true });
      console.log(`Completed: ${name}`);
    } catch (error) {
      console.error(`Failed: ${name}`, error);
      results.push({ name, error, success: false });
      errors.push({ name, error });
      
      if (stopOnError) {
        throw error;
      }
    }
  }
  
  return { results, errors, success: errors.length === 0 };
}

/**
 * グローバルエラーハンドラー
 * @param {Error} error - エラーオブジェクト
 * @param {string} context - エラーが発生したコンテキスト
 */
function handleGlobalError(error, context = 'Unknown') {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  console.error('Global error:', errorInfo);
  
  // LINE通知（設定されている場合）
  if (typeof sendLineNotification === 'function') {
    sendLineNotification(`エラー発生: ${context}\n${error.message}`);
  }
  
  return errorInfo;
}

// 使用例
// await retryOperation(async () => {
//   await safeClick('#submit-button');
// }, 3, 2000, 'Submit form');
//
// await withTimeout(async () => {
//   await waitForElement('#loading-complete');
// }, 30000, 'Wait for loading');
//
// await executeSequence([
//   { fn: async () => await safeClick('#step1'), name: 'Step 1' },
//   { fn: async () => await safeInput('#input1', 'value'), name: 'Step 2' },
//   { fn: async () => await safeClick('#submit'), name: 'Submit' }
// ]);