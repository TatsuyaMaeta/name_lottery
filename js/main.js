function lottery() {
    // HTMLの入力フォームから数値を取得し、整数に変換
    const start = parseInt($("#start").val()); // 開始数値
    const end = parseInt($("#end").val()); // 終了数値
    let time = parseInt($("#time").val()) * 1000; // 抽選時間(秒)をミリ秒に変換

    console.log(time, "秒");

    const names = $("#items").val();

    localStorage.setItem("lotteryNameList", names);

    // HTMLのテキストエリアから候補を取得し、改行で分割、空行を除外
    const items = $("#items").val().split("\n").filter(Boolean);

    // 入力値が不正な場合、アラートを表示して関数終了
    if (isNaN(start) || isNaN(end) || items.length === 0) {
        alert("数字範囲と候補を入力してください。");
        return;
    }

    // 抽選対象の数字配列を作成
    let numbers = [];
    if (start && end) {
        // 開始と終了が指定されている場合
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
    } else {
        // テキストエリアの値をそのまま使用する
        numbers = items;
    }

    numbers.forEach((v, index) => {
        numbers = numbers.concat(numbers);
    });
    console.log("numbers", numbers);

    // Fisher-Yatesシャッフルアルゴリズムで配列をシャッフル
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(numbers);

    // 抽選結果を表示する処理
    let index = 0; // 配列のインデックス
    const intervalId = setInterval(() => {
        $("#resultTitle").text("抽選中"); // タイトルを"抽選中"に変更
        $("#resultBody").text(numbers[index]); // 結果表示エリアに数字を表示
        index++; // インデックスをインクリメント

        // 抽選時間が終了した場合、またはすべての数字を表示した場合、間隔処理を停止
        if (index >= numbers.length || time <= 0) {
            clearInterval(intervalId);
            $("#resultTitle").text("結果発表"); // タイトルを"結果発表"に変更
            $("#resultBody").text(numbers[index - 1]); // 最終的な抽選結果を表示
        }

        time -= 100; // 残りの時間を100ミリ秒減らす
    }, 80); // 100ミリ秒ごとに処理を実行
}

// "startButton"をクリックしたときのイベントリスナー
$("#startButton").on("click", lottery);
