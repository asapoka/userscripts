// ==UserScript==
// @name        [SCRIPT_NAME]
// @namespace   Violentmonkey Scripts
// @match       https://[DOMAIN]/[PATH]*
// @grant       none
// @version     1.0
// @author      asapoka
// @description [DESCRIPTION] - [TIMESTAMP]
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

/**
 * 設定オブジェクト
 */
const CONFIG = {
  // サンプル値（実際の値に置き換えてください）
  sampleEmail: "sample@mail.com",
  samplePhone: "09012345678",
  sampleId: "999999",
  
  // タイミング設定
  delays: {
    short: 1000,
    medium: 3000,
    long: 5000
  },
  
  // リトライ設定
  retry: {
    maxAttempts: 3,
    interval: 2000
  },
  
  // LINE通知設定（必要に応じて設定）
  line: {
    token: "",
    enabled: false
  }
};

/**
 * 共通ユーティリティ関数
 */
const Utils = {
  /**
   * 指定時間待機
   * @param {number} ms - 待機時間（ミリ秒）
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * 要素が表示されるまで待機
   * @param {string} selector - CSSセレクタ
   * @param {number} timeout - タイムアウト時間（ミリ秒）
   */
  waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkElement = () => {
        const element = $(selector);
        if (element.length > 0) {
          resolve(element);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Element not found: ${selector}`));
        } else {
          setTimeout(checkElement, 100);
        }
      };
      
      checkElement();
    });
  },

  /**
   * ページロード完了を待機
   * @param {number} timeout - タイムアウト時間（ミリ秒）
   */
  waitForPageLoad(timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkLoad = () => {
        if (document.readyState === 'complete') {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Page load timeout'));
        } else {
          setTimeout(checkLoad, 100);
        }
      };
      
      checkLoad();
    });
  },

  /**
   * 要素に安全にクリック実行
   * @param {string} selector - CSSセレクタ
   * @param {number} delay - クリック後の待機時間
   */
  async safeClick(selector, delay = CONFIG.delays.short) {
    try {
      const element = await this.waitForElement(selector);
      element.click();
      await this.delay(delay);
      console.log(`Clicked: ${selector}`);
    } catch (error) {
      console.error(`Click failed: ${selector}`, error);
      throw error;
    }
  },

  /**
   * フォームに安全に値を入力
   * @param {string} selector - CSSセレクタ
   * @param {string} value - 入力値
   * @param {number} delay - 入力後の待機時間
   */
  async safeInput(selector, value, delay = CONFIG.delays.short) {
    try {
      const element = await this.waitForElement(selector);
      element.val(value);
      await this.delay(delay);
      console.log(`Input: ${selector} = ${value}`);
    } catch (error) {
      console.error(`Input failed: ${selector}`, error);
      throw error;
    }
  },

  /**
   * LINE通知送信（必要に応じて実装）
   * @param {string} message - 通知メッセージ
   */
  async sendLineNotification(message) {
    if (!CONFIG.line.enabled || !CONFIG.line.token) {
      console.log('LINE notification disabled or token not set');
      return;
    }

    // patterns/line-notification.js を参照してください
    console.log('LINE notification:', message);
  }
};

/**
 * メインの自動化処理
 */
async function exec_workflow() {
  try {
    console.log('Starting workflow...');
    
    // ページロード完了を待機
    await Utils.waitForPageLoad();
    
    // TODO: ここに具体的な自動化処理を記述
    
    console.log('Workflow completed successfully');
    
  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

/**
 * スクリプト実行エントリポイント
 */
window.addEventListener("load", async function () {
  console.log('UserScript loaded');
  
  // 少し待機してから実行（ページが完全に読み込まれるまで）
  setTimeout(exec_workflow, CONFIG.delays.medium);
});