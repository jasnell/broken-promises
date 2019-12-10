const { writeFile, readFile, unlink } = require('fs').promises;
const file = './foo.json';

unlink(file).catch(()=>{ /** ignore **/ });

const numbers = [];

async function verify() {
	const number = Math.random();
	numbers.push(number);
	await writeFile(file, JSON.stringify({number}), "utf-8");
	const data = JSON.parse(await readFile(file,"utf-8"));
}

(async () => {
	const promises = [];
	for (var i = 0; i < 10; i++)
		promises.push(verify());

	Promise.all(promises)
		.catch((e) => {
			console.log(numbers);
			console.error(e);
    });
})();
