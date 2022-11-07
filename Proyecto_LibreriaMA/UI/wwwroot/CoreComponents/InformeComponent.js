
export default function TableInforme(Dataset = [], Table, Header = []) {
    const thead = Table.querySelector("thead");
    const tbody = Table.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";
    Dataset.forEach((item, index) => {
        const row = document.createElement("tr");
        for (var prop in item) {
            if (Header.find(x => x == prop)) {
                if (index == 0) {
                    const th = document.createElement("th");
                    th.innerText = prop;
                    thead.append(th);
                }
                const td = document.createElement("td");
                td.innerText = item[prop];
                row.append(td);
            }

        }
        tbody.append(row);
    });
}