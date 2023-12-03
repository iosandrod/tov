import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
	Object.entries(
		import.meta.glob('../../locales/*.y(a)?ml', {
			eager: true,
		}),
	).map(([key, value]) => {
		const yaml = key.endsWith('.yaml')
		// @ts-ignore
		return [key.slice(14, yaml ? -5 : -4), value.default]
	}),
)

// localStorage 中的 locale，第二个参数为默认值
// https://vueuse.org/core/useStorage/#usestorage
const storageLocale = useStorage('locale', '简体中文')

export const i18n = createI18n({
	messages,
	legacy: false,
})

// 同步本地 localStorage 和 i18n
// https://vueuse.org/shared/syncRef/#syncref
syncRef(storageLocale, i18n.global.locale)

export default i18n
