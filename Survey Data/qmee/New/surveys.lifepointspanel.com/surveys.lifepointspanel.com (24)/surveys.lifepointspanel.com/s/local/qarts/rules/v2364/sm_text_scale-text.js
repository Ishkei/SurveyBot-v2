QArts.rules["sm_text_scale-text"] = function (a, b) {
  return [
    { c: b.aLen <= 2, s: "sm_text_scale-text_2.json" },
    { c: b.aLen <= 3, s: "sm_text_scale-text_3.json" },
    { c: b.aLen <= 4, s: "sm_text_scale-text_4.json" },
    { c: b.aLen <= 5, s: "sm_text_scale-text_5.json" },
    { c: b.aLen <= 6, s: "sm_text_scale-text_6.json" },
    { c: b.aLen <= 7, s: "sm_text_scale-text_7.json" },
    { c: b.aLen <= 8, s: "sm_text_scale-text_8.json" },
    { c: b.aLen <= 9, s: "sm_text_scale-text_9.json" },
    { c: !0, s: "sm_text_scale-text_default.json" },
  ];
};
