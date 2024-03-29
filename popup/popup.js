/* Copyright (C) 2023 Hideaki Sakai

This file is part of Hide-X-Community-Notes.

Hide-X-Community-Notes is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Hide-X-Community-Notes is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Hide-X-Community-Notes.  If not, see <https://www.gnu.org/licenses/>.
*/

// constants, variables ===========================================================================
let onFlag = true;
const SAVEKEY = "onFlag";


// addEventListener ================================================================================
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("btnradio-on").addEventListener("change", changeToOn);
document.getElementById("btnradio-off").addEventListener("change", changeToOff);

document.getElementById("reload-button").addEventListener("click", reloadCurrentPage);


// Functions =======================================================================================
function storageValue(value) {
    return browser.storage.local.set({[SAVEKEY]: value});
    // return browser.storage.sync.set({[SAVEKEY]: value});
}

// btnradio-on がクリックされた場合の処理をする関数
function changeToOn() {
    storageValue(true);
    buttonDisplay(true);
}

// btnradio-off がクリックされた場合の処理をする関数
function changeToOff() {
    storageValue(false);
    buttonDisplay(true);
}

// reload-button-div の class を display-none にセットしたり、はずしたりする関数
function buttonDisplay(displayFlag) {
    if (displayFlag) {
        document.getElementById("reload-button-div").classList.remove('display-none');
    }
    else {
        document.getElementById("reload-button-div").classList.add('display-none');
    }
}

// reload ==========================================================================================
function reloadCurrentPage() {
    // Reload the active tab of the current window:
    browser.tabs.reload();
    buttonDisplay(false);
}


// popup表示時に実行する関数 =======================================================================
// restoreOptions() → storageGet() → onGot()

// storage.get がエラーになったとき実行される関数
function onError(error) {
    console.error(`popup:onError: ${error}`);
}

// storage.get が正常に実行されたとき実行される関数
function onGot(item) {
    if (SAVEKEY in item) {
        onFlag = item[SAVEKEY]; // グローバル変数にセット
    }

    if (onFlag) {
        document.getElementById("btnradio-on").checked = true;
        document.getElementById("btnradio-off").checked = false;
    }
    else {
        document.getElementById("btnradio-on").checked = false;
        document.getElementById("btnradio-off").checked = true;
    }
}

// storageから取得
// keys を指定せずに呼び出すと全て取得
// https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
function storageGet() {
    // return browser.storage.sync.get();
    return browser.storage.local.get();
}

// 保存してある設定項目の値を読み込む関数
function restoreOptions() {
    storageGet()
        .then(onGot)
        .catch(onError);
}
