export function languageFormatter(word, languageOption = 1) {
    const title = word ? JSON.parse(word) : [];

    if (title.length <= 0) return "-";

    const selectedTitle = title
        .filter((d) => d.ltId == languageOption)
        .map((l) => l.value);

    return selectedTitle[0];
}
