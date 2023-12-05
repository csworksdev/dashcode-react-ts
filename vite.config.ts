import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import rollupReplace from "@rollup/plugin-replace";
import path from "path";

export default defineConfig(({ command, mode }) => {
	return {
		resolve: {
			alias: [
				{
					find: "@",
					replacement: path.resolve(__dirname, "./src"),
				},
			],
		},
		plugins: [
			rollupReplace({
				preventAssignment: true,
				values: {
					"process.env.NODE_ENV": JSON.stringify("development"),
				},
			}),
			react(),
			svgr()
		],
		server: {
			watch: {
				usePolling: true,
			},
			// host: '127.0.0.1',
			strictPort: true,
			host: '0.0.0.0',
			port: 3121,
		},
		build: {
			outDir: 'build',
			onwarn(warning: any, warn: any) {
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return
				}
				warn(warning)
			},
			sourcemap: false,
		},
	}
});
