window.addEventListener('load', () => {
	const el = $('#app');

	// Compile the Handlebar Templates
	const errorTemplate = Handlebars.compile($('#error-template').html());
	const ratesTemplate = Handlebars.compile($('#rates-template').html());
	const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
	const historicalTemplate = Handlebars.compile($('#historical-template').html());

	// Roter Declaration
	const router = new Router({
		mode: 'history',
		page404: path => {
			const html = errorTemplate({
				color: 'yellow',
				title: 'Error 404 - Page Not Found',
				message: `The path '/${path}' does not exist on this site`
			});
			el.html(html);
		}
	});

	router.add('/', () => {
		let html = exchangeTemplate();
		el.html(html);
	});

	router.add('/exchange', () => {
		let html = exchangeTemplate();
		el.html(html);
	});

	router.add('/historical', () => {
		let html = historicalTemplate();
		el.html(html);
	});

	// Navigate the app to the current URL
	router.navigateTo(window.location.pathname);

	// Highlight the active menu on refresh/page reload
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', e => {
		// Block the browser form reloading the page
		e.preventDefault();

		// Highlight the active menu item on click
		const target = $(e.target);
		$('.item').removeClass('active');
		target.addClass('active');

		// Navigate to the clicked URL
		const href = target.attr('href');
		const path = href.substr(href.lastIndexOf('/'));
		router.navigateTo(path);
	});
});
