!(function () {
	"use strict";
	async function i(i, n = {}, t) {
		return window.__TAURI_INTERNALS__.invoke(i, n, t);
	}
	"function" == typeof SuppressedError && SuppressedError,
		(function () {
			let n = !1,
				t = "default";
			function o(i) {
				(n = !0), (window.Notification.permission = i), (n = !1);
			}
			(window.Notification = function (n, t) {
				const o = t || {};
				!(async function (n) {
					"object" == typeof n && Object.freeze(n),
						await i("plugin:notification|notify", {
							options: "string" == typeof n ? { title: n } : n,
						});
				})(Object.assign(o, { title: n }));
			}),
				(window.Notification.requestPermission = async function () {
					return await i(
						"plugin:notification|request_permission",
					).then(
						(i) => (
							o(
								"prompt" === i || "prompt-with-rationale" === i
									? "default"
									: i,
							),
							i
						),
					);
				}),
				Object.defineProperty(window.Notification, "permission", {
					enumerable: !0,
					get: () => t,
					set: (i) => {
						if (!n) throw new Error("Readonly property");
						t = i;
					},
				}),
				(async function () {
					return "default" !== window.Notification.permission ||
						__TEMPLATE_windows__
						? await Promise.resolve(
								"granted" === window.Notification.permission,
							)
						: await i("plugin:notification|is_permission_granted");
				})().then(function (i) {
					o(null === i ? "default" : i ? "granted" : "denied");
				});
		})();
})();
