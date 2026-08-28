import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as parseQuickAdd, L as emptyDraft, Q as useAppStore, i as Route$14, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskForm } from "./task-form-CXlmHSKx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-DZ7W13dM.js
var import_jsx_runtime = require_jsx_runtime();
function CreatePage() {
	const search = Route$14.useSearch();
	const add = useAppStore((s) => s.addTask);
	const navigate = useNavigate();
	const parsed = search.q ? parseQuickAdd(search.q) : null;
	const initial = emptyDraft({
		title: parsed?.title ?? search.q ?? "",
		kind: search.kind ?? parsed?.kind ?? "todo",
		category: search.category ?? parsed?.category ?? "personal",
		date: search.date ?? parsed?.date ?? null,
		time: parsed?.time ?? null,
		amount: parsed?.amount ?? null,
		priority: parsed?.priority ?? "medium",
		repeat: parsed?.repeat ?? { type: "none" }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "New task",
		hideFab: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskForm, {
			initial,
			submitLabel: "Save task",
			onSubmit: (draft) => {
				const id = add(draft);
				navigate({
					to: "/task/$id",
					params: { id }
				});
			}
		})
	});
}
//#endregion
export { CreatePage as component };
