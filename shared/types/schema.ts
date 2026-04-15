
export interface ExtensionSeoMetadata {
    title?: string;
    meta_description?: string;
    og_image?: string;
    additional_fields?: Record<string, unknown>;
    sitemap?: {
        change_frequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: string;
    };
    no_index?: boolean;
    no_follow?: boolean;
}

export interface BlockAbout {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	title?: string | null;
	button?: BlockButton | string | null;
	image?: DirectusFile | string | null;
	description?: string | null;
	advantages?: string | null;
	info?: string | null;
	documents?: BlockAboutFile[] | string[];
}

export interface BlockAboutFile {
	/** @primaryKey */
	id: number;
	block_about_id?: BlockAbout | string | null;
	directus_files_id?: DirectusFile | string | null;
	sort?: number | null;
}

export interface BlockButton {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	type?: 'page' | 'url' | null;
	page?: Page | string | null;
	url?: string | null;
	label?: string | null;
	variant?: 'solid' | 'outline' | null;
	size?: 'default' | 'small' | null;
	arrow?: boolean | null;
	button_group?: BlockButtonGroup | string | null;
}

export interface BlockButtonGroup {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	buttons?: BlockButton[] | string[];
}

export interface BlockDoctor {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	display_as?: 'block' | 'grid' | null;
	headline?: string | null;
	button?: BlockButton | string | null;
	doctors?: BlockDoctorsDoctor[] | string[];
}

export interface BlockDoctorsDoctor {
	/** @primaryKey */
	id: number;
	block_doctors_id?: BlockDoctor | string | null;
	doctors_id?: Doctor | string | null;
	sort?: number | null;
}

export interface BlockFaq {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	display_as?: 'grid' | 'block' | null;
	button?: BlockButton | string | null;
	items?: BlockFaqFaq[] | string[];
}

export interface BlockFaqFaq {
	/** @primaryKey */
	id: number;
	block_faq_id?: BlockFaq | string | null;
	faq_id?: Faq | string | null;
	sort?: number | null;
}

export interface BlockForm {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	title?: string | null;
	consent_text?: string | null;
	success_message?: string | null;
	email_recipient?: string | null;
}

export interface BlockHero {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	tagline?: string | null;
	headline?: string | null;
	description?: string | null;
	button_group?: BlockButtonGroup | string | null;
	image?: DirectusFile | string | null;
}

export interface BlockMap {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	map?: string | null;
	links?: Array<{ text: string; icon: 'location' | 'email' | 'phone' | 'vkoutline' | 'telegramoutline'; link: string }> | null;
	title?: string | null;
	working_hours?: string | null;
	button?: BlockButton | string | null;
}

export interface BlockNew {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	/** @description Сколько записчей подгружать по нажатию кнопки "Показать еще" */
	load_more_step?: '3' | '6' | null;
	/** @description 1 главная (последняя новость) + 3 следующие */
	items_limit?: number | null;
}

export interface BlockPhotoSlider {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	photos?: BlockPhotoSliderFile[] | string[];
}

export interface BlockPhotoSliderFile {
	/** @primaryKey */
	id: number;
	block_photo_slider_id?: BlockPhotoSlider | string | null;
	directus_files_id?: DirectusFile | string | null;
	sort?: number | null;
}

export interface BlockPromotion {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	display_as?: 'block' | 'grid' | null;
	button?: BlockButton | string | null;
	promotionsgroup?: BlockPromotionsPromotion[] | string[];
}

export interface BlockPromotionsPromotion {
	/** @primaryKey */
	id: number;
	block_promotions_id?: BlockPromotion | string | null;
	promotions_id?: Promotion | string | null;
	sort?: number | null;
}

export interface BlockRating {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	ratingsgroup?: Rating[] | string[];
}

export interface BlockReview {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @description Отзывы */
	headline?: string | null;
	reviewsgroup?: Review[] | string[];
}

export interface BlockRichtext {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	content?: string | null;
	/** @description Left - с на белом фоне, с выравниванием по левой стороне.<br>Center – без подложки и центрирован */
	alignment?: 'left' | 'center' | null;
}

export interface BlockService {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	headline?: string | null;
	display_as?: 'block' | 'grid' | null;
	show_all_link?: boolean | null;
	featured_services?: Service[] | string[];
	list_categories?: Category[] | string[];
}

export interface Category {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	title?: string | null;
	list_categories?: BlockService | string | null;
	color?: string | null;
	services?: Service[] | string[];
}

export interface Doctor {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	/** @required */
	title: string;
	image?: DirectusFile | string | null;
	education?: string | null;
	experience?: string | null;
	certificates?: string | null;
	skills?: string | null;
	/** @description Опыт работы в годах */
	standing?: string | null;
	seo?: ExtensionSeoMetadata | null;
	/** @description Избегайте цифр и будьте внимательны @required */
	slug: string;
	button?: BlockButton | string | null;
	description?: string | null;
	/** @description Цвет подложки на карточке */
	color?: string | null;
	blocks?: DoctorsBlock[] | string[];
}

export interface DoctorsBlock {
	/** @primaryKey */
	id: number;
	doctors_id?: Doctor | string | null;
	item?: BlockForm | BlockReview | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface Faq {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	question?: string | null;
	answer?: string | null;
}

export interface FormSubmission {
	/** @primaryKey */
	id: string;
	status?: 'new' | 'contacted' | 'converted' | 'spam';
	sort?: number | null;
	date_created?: string | null;
	user_updated?: DirectusUser | string | null;
	date_updated?: string | null;
	name?: string | null;
	phone?: string | null;
	consent?: boolean | null;
	source_page?: string | null;
	ip_address?: string | null;
	user_agent?: string | null;
}

export interface Globals {
	/** @primaryKey */
	id: string;
	social_links?: Array<{ url: string; service: 'telegram' | 'vk' | 'whatsapp' }> | null;
	/** @description Адрес клиники */
	address?: string | null;
	email?: string | null;
	phone?: string | null;
	url?: string | null;
	logo_short?: DirectusFile | string | null;
	logo_full?: DirectusFile | string | null;
	title?: string | null;
	price_list_file?: DirectusFile | string | null;
}

export interface Navigation {
	/** @primaryKey @required */
	id: string;
	title?: string | null;
	is_active?: boolean | null;
	sort?: number | null;
	items?: NavigationItem[] | string[];
}

export interface NavigationItem {
	/** @primaryKey */
	id: number;
	/** @required */
	title: string;
	type?: 'page' | 'url' | 'file' | null;
	page?: Page | string | null;
	url?: string | null;
	sort?: number | null;
	file?: DirectusFile | string | null;
	navigation?: Navigation | string | null;
}

export interface New {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	/** @required */
	title: string;
	/** @description Адрес новости @required */
	slug: string;
	/** @description Краткий анонс новости для размещения на карточке */
	excerpt?: string | null;
	image?: DirectusFile | string | null;
	content?: string | null;
	seo?: ExtensionSeoMetadata | null;
	/** @description Приблизительное время прочтения новости */
	reading_time?: number | null;
	button?: BlockButton | string | null;
}

export interface Page {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	/** @required */
	title: string;
	/** @required */
	permalink: string;
	seo?: ExtensionSeoMetadata | null;
	blocks?: PagesBlock[] | string[];
}

export interface PagesBlock {
	/** @primaryKey */
	id: number;
	pages_id?: Page | string | null;
	item?: BlockHero | BlockFaq | BlockRichtext | BlockRating | BlockPhotoSlider | BlockMap | BlockDoctor | BlockReview | BlockAbout | BlockForm | BlockPromotion | BlockNew | BlockService | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface Promotion {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	/** @description Заголовок акции @required */
	title: string;
	/** @description Краткое описание акции */
	description?: string | null;
	content?: string | null;
	/** @description Обложка акции */
	image?: DirectusFile | string | null;
	/** @description Дата ОКОНЧАНИЯ промо–акции */
	date?: string | null;
	/** @required */
	slug: string;
	seo?: ExtensionSeoMetadata | null;
	button?: BlockButton | string | null;
	blocks?: PromotionsBlock[] | string[];
}

export interface PromotionsBlock {
	/** @primaryKey */
	id: number;
	promotions_id?: Promotion | string | null;
	item?: BlockForm | BlockReview | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface Rating {
	/** @primaryKey */
	id: string;
	sort?: number | null;
	/** @required */
	value: string;
	source?: string | null;
	title?: string | null;
	reviews?: string | null;
	image?: DirectusFile | string | null;
	ratingsgroup?: BlockRating | string | null;
}

export interface Review {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	/** @description Формат записи: Имя Ф. @required */
	name: string;
	date?: string | null;
	/** @description Длина отзыва не более 160 символов @required */
	content: string;
	/** @description Ссылка нужна  для внутреннего пользования! Не видна пользователю сайта. */
	url?: string | null;
	reviewsgroup?: BlockReview | string | null;
}

export interface Service {
	/** @primaryKey */
	id: string;
	status?: 'published' | 'draft' | 'archived';
	sort?: number | null;
	/** @required */
	title: string;
	/** @description Генерируется автоматически @required */
	slug: string;
	category?: Category | string | null;
	icon?: DirectusFile | string | null;
	image?: DirectusFile | string | null;
	prices?: Array<{ item: string; value: string; code: string }> | null;
	symptoms?: Array<{ item: string }> | null;
	process?: Array<{ step: string }> | null;
	seo?: ExtensionSeoMetadata | null;
	featured_services?: BlockService | string | null;
	button?: BlockButton | string | null;
	description?: string | null;
	details?: string | null;
	/** @description Обязательная заметка о ценах! */
	notice?: string | null;
	blocks?: ServicesBlock[] | string[];
}

export interface ServicesBlock {
	/** @primaryKey */
	id: number;
	services_id?: Service | string | null;
	item?: BlockDoctor | BlockRating | string | null;
	collection?: string | null;
	sort?: number | null;
}

export interface DirectusAccess {
	/** @primaryKey */
	id: string;
	role?: DirectusRole | string | null;
	user?: DirectusUser | string | null;
	policy?: DirectusPolicy | string;
	sort?: number | null;
}

export interface DirectusActivity {
	/** @primaryKey */
	id: number;
	action?: string;
	user?: DirectusUser | string | null;
	timestamp?: string;
	ip?: string | null;
	user_agent?: string | null;
	collection?: string;
	item?: string;
	origin?: string | null;
	revisions?: DirectusRevision[] | string[];
}

export interface DirectusCollection {
	/** @primaryKey */
	collection: string;
	icon?: string | null;
	note?: string | null;
	display_template?: string | null;
	hidden?: boolean;
	singleton?: boolean;
	translations?: Array<{ language: string; translation: string; singular: string; plural: string }> | null;
	archive_field?: string | null;
	archive_app_filter?: boolean;
	archive_value?: string | null;
	unarchive_value?: string | null;
	sort_field?: string | null;
	accountability?: 'all' | 'activity' | null | null;
	color?: string | null;
	item_duplication_fields?: 'json' | null;
	sort?: number | null;
	group?: DirectusCollection | string | null;
	collapse?: string;
	preview_url?: string | null;
	versioning?: boolean;
}

export interface DirectusComment {
	/** @primaryKey */
	id: string;
	collection?: DirectusCollection | string;
	item?: string;
	comment?: string;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
}

export interface DirectusField {
	/** @primaryKey */
	id: number;
	collection?: DirectusCollection | string;
	field?: string;
	special?: string[] | null;
	interface?: string | null;
	options?: 'json' | null;
	display?: string | null;
	display_options?: 'json' | null;
	readonly?: boolean;
	hidden?: boolean;
	sort?: number | null;
	width?: string | null;
	translations?: 'json' | null;
	note?: string | null;
	conditions?: 'json' | null;
	required?: boolean | null;
	group?: DirectusField | string | null;
	validation?: 'json' | null;
	validation_message?: string | null;
	searchable?: boolean;
}

export interface DirectusFile {
	/** @primaryKey */
	id: string;
	storage?: string;
	filename_disk?: string | null;
	filename_download?: string;
	title?: string | null;
	type?: string | null;
	folder?: DirectusFolder | string | null;
	uploaded_by?: DirectusUser | string | null;
	created_on?: string;
	modified_by?: DirectusUser | string | null;
	modified_on?: string;
	charset?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
	duration?: number | null;
	embed?: string | null;
	description?: string | null;
	location?: string | null;
	tags?: string[] | null;
	metadata?: 'json' | null;
	focal_point_x?: number | null;
	focal_point_y?: number | null;
	tus_id?: string | null;
	tus_data?: 'json' | null;
	uploaded_on?: string | null;
}

export interface DirectusFolder {
	/** @primaryKey */
	id: string;
	name?: string;
	parent?: DirectusFolder | string | null;
}

export interface DirectusMigration {
	/** @primaryKey */
	version: string;
	name?: string;
	timestamp?: string | null;
}

export interface DirectusPermission {
	/** @primaryKey */
	id: number;
	collection?: string;
	action?: string;
	permissions?: 'json' | null;
	validation?: 'json' | null;
	presets?: 'json' | null;
	fields?: string[] | null;
	policy?: DirectusPolicy | string;
}

export interface DirectusPolicy {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	ip_access?: string[] | null;
	enforce_tfa?: boolean;
	admin_access?: boolean;
	app_access?: boolean;
	permissions?: DirectusPermission[] | string[];
	users?: DirectusAccess[] | string[];
	roles?: DirectusAccess[] | string[];
}

export interface DirectusPreset {
	/** @primaryKey */
	id: number;
	bookmark?: string | null;
	user?: DirectusUser | string | null;
	role?: DirectusRole | string | null;
	collection?: string | null;
	search?: string | null;
	layout?: string | null;
	layout_query?: 'json' | null;
	layout_options?: 'json' | null;
	refresh_interval?: number | null;
	filter?: 'json' | null;
	icon?: string | null;
	color?: string | null;
}

export interface DirectusRelation {
	/** @primaryKey */
	id: number;
	many_collection?: string;
	many_field?: string;
	one_collection?: string | null;
	one_field?: string | null;
	one_collection_field?: string | null;
	one_allowed_collections?: string[] | null;
	junction_field?: string | null;
	sort_field?: string | null;
	one_deselect_action?: string;
}

export interface DirectusRevision {
	/** @primaryKey */
	id: number;
	activity?: DirectusActivity | string;
	collection?: string;
	item?: string;
	data?: 'json' | null;
	delta?: 'json' | null;
	parent?: DirectusRevision | string | null;
	version?: DirectusVersion | string | null;
}

export interface DirectusRole {
	/** @primaryKey */
	id: string;
	/** @required */
	name: string;
	icon?: string;
	description?: string | null;
	parent?: DirectusRole | string | null;
	children?: DirectusRole[] | string[];
	policies?: DirectusAccess[] | string[];
	users?: DirectusUser[] | string[];
}

export interface DirectusSession {
	/** @primaryKey */
	token: string;
	user?: DirectusUser | string | null;
	expires?: string;
	ip?: string | null;
	user_agent?: string | null;
	share?: DirectusShare | string | null;
	origin?: string | null;
	next_token?: string | null;
}

export interface DirectusSettings {
	/** @primaryKey */
	id: number;
	project_name?: string;
	project_url?: string | null;
	project_color?: string;
	project_logo?: DirectusFile | string | null;
	public_foreground?: DirectusFile | string | null;
	public_background?: DirectusFile | string | null;
	public_note?: string | null;
	auth_login_attempts?: number | null;
	auth_password_policy?: null | `/^.{8,}$/` | `/(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\\s).*$/` | null;
	storage_asset_transform?: 'all' | 'none' | 'presets' | null;
	storage_asset_presets?: Array<{ key: string; fit: 'contain' | 'cover' | 'inside' | 'outside'; width: number; height: number; quality: number; withoutEnlargement: boolean; format: 'auto' | 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif'; transforms: 'json' }> | null;
	custom_css?: string | null;
	storage_default_folder?: DirectusFolder | string | null;
	basemaps?: Array<{ name: string; type: 'raster' | 'tile' | 'style'; url: string; tileSize: number; attribution: string }> | null;
	mapbox_key?: string | null;
	module_bar?: 'json' | null;
	project_descriptor?: string | null;
	default_language?: string;
	custom_aspect_ratios?: Array<{ text: string; value: number }> | null;
	public_favicon?: DirectusFile | string | null;
	default_appearance?: 'auto' | 'light' | 'dark';
	default_theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	default_theme_dark?: string | null;
	theme_dark_overrides?: 'json' | null;
	report_error_url?: string | null;
	report_bug_url?: string | null;
	report_feature_url?: string | null;
	public_registration?: boolean;
	public_registration_verify_email?: boolean;
	public_registration_role?: DirectusRole | string | null;
	public_registration_email_filter?: 'json' | null;
	visual_editor_urls?: Array<{ url: string }> | null;
	project_id?: string | null;
	mcp_enabled?: boolean;
	mcp_allow_deletes?: boolean;
	mcp_prompts_collection?: string | null;
	mcp_system_prompt_enabled?: boolean;
	mcp_system_prompt?: string | null;
	project_owner?: string | null;
	project_usage?: string | null;
	org_name?: string | null;
	product_updates?: boolean | null;
	project_status?: string | null;
	ai_openai_api_key?: string | null;
	ai_anthropic_api_key?: string | null;
	ai_system_prompt?: string | null;
	ai_google_api_key?: string | null;
	ai_openai_compatible_api_key?: string | null;
	ai_openai_compatible_base_url?: string | null;
	ai_openai_compatible_name?: string | null;
	ai_openai_compatible_models?: Array<{ id: string; name: string; context: number; output: number; attachment: boolean; reasoning: boolean; providerOptions: Record<string, any> }> | null;
	ai_openai_compatible_headers?: Array<{ header: string; value: string }> | null;
	ai_openai_allowed_models?: Array<`gpt-4o-mini` | `gpt-4.1-nano` | `gpt-4.1-mini` | `gpt-4.1` | `gpt-5-nano` | `gpt-5-mini` | `gpt-5` | `gpt-5.2` | `gpt-5.2-chat-latest` | `gpt-5.2-pro` | `gpt-5.4` | `gpt-5.4-pro`> | null;
	ai_anthropic_allowed_models?: Array<`claude-haiku-4-5` | `claude-sonnet-4-5` | `claude-opus-4-5` | `claude-sonnet-4-6` | `claude-opus-4-6`> | null;
	ai_google_allowed_models?: Array<`gemini-3-pro-preview` | `gemini-3-flash-preview` | `gemini-2.5-pro` | `gemini-2.5-flash` | `gemini-3.1-pro-preview` | `gemini-3.1-flash-lite-preview` | `gemini-2.5-flash-lite`> | null;
	collaborative_editing_enabled?: boolean;
}

export interface DirectusUser {
	/** @primaryKey */
	id: string;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
	password?: string | null;
	location?: string | null;
	title?: string | null;
	description?: string | null;
	tags?: string[] | null;
	avatar?: DirectusFile | string | null;
	language?: string | null;
	tfa_secret?: string | null;
	status?: 'draft' | 'invited' | 'unverified' | 'active' | 'suspended' | 'archived';
	role?: DirectusRole | string | null;
	token?: string | null;
	last_access?: string | null;
	last_page?: string | null;
	provider?: string;
	external_identifier?: string | null;
	auth_data?: 'json' | null;
	email_notifications?: boolean | null;
	appearance?: null | 'auto' | 'light' | 'dark' | null;
	theme_dark?: string | null;
	theme_light?: string | null;
	theme_light_overrides?: 'json' | null;
	theme_dark_overrides?: 'json' | null;
	text_direction?: 'auto' | 'ltr' | 'rtl';
	policies?: DirectusAccess[] | string[];
}

export interface DirectusDashboard {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string;
	note?: string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	color?: string | null;
	panels?: DirectusPanel[] | string[];
}

export interface DirectusPanel {
	/** @primaryKey */
	id: string;
	dashboard?: DirectusDashboard | string;
	name?: string | null;
	icon?: string | null;
	color?: string | null;
	show_header?: boolean;
	note?: string | null;
	type?: string;
	position_x?: number;
	position_y?: number;
	width?: number;
	height?: number;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusNotification {
	/** @primaryKey */
	id: number;
	timestamp?: string | null;
	status?: string | null;
	recipient?: DirectusUser | string;
	sender?: DirectusUser | string | null;
	subject?: string;
	message?: string | null;
	collection?: string | null;
	item?: string | null;
}

export interface DirectusShare {
	/** @primaryKey */
	id: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	role?: DirectusRole | string | null;
	password?: string | null;
	user_created?: DirectusUser | string | null;
	date_created?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	times_used?: number | null;
	max_uses?: number | null;
}

export interface DirectusFlow {
	/** @primaryKey */
	id: string;
	name?: string;
	icon?: string | null;
	color?: string | null;
	description?: string | null;
	status?: string;
	trigger?: string | null;
	accountability?: string | null;
	options?: 'json' | null;
	operation?: DirectusOperation | string | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	operations?: DirectusOperation[] | string[];
}

export interface DirectusOperation {
	/** @primaryKey */
	id: string;
	name?: string | null;
	key?: string;
	type?: string;
	position_x?: number;
	position_y?: number;
	options?: 'json' | null;
	resolve?: DirectusOperation | string | null;
	reject?: DirectusOperation | string | null;
	flow?: DirectusFlow | string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
}

export interface DirectusTranslation {
	/** @primaryKey */
	id: string;
	/** @required */
	language: string;
	/** @required */
	key: string;
	/** @required */
	value: string;
}

export interface DirectusVersion {
	/** @primaryKey */
	id: string;
	key?: string;
	name?: string | null;
	collection?: DirectusCollection | string;
	item?: string;
	hash?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	user_created?: DirectusUser | string | null;
	user_updated?: DirectusUser | string | null;
	delta?: 'json' | null;
}

export interface DirectusExtension {
	enabled?: boolean;
	/** @primaryKey */
	id: string;
	folder?: string;
	source?: string;
	bundle?: string | null;
}

export interface DirectusDeployment {
	/** @primaryKey */
	id: string;
	provider?: string;
	credentials?: string | null;
	options?: 'json' | null;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	webhook_ids?: 'json' | null;
	webhook_secret?: string | null;
	last_synced_at?: string | null;
	projects?: DirectusDeploymentProject[] | string[];
}

export interface DirectusDeploymentProject {
	/** @primaryKey */
	id: string;
	deployment?: DirectusDeployment | string;
	external_id?: string;
	name?: string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	url?: string | null;
	framework?: string | null;
	deployable?: boolean;
	runs?: DirectusDeploymentRun[] | string[];
}

export interface DirectusDeploymentRun {
	/** @primaryKey */
	id: string;
	project?: DirectusDeploymentProject | string;
	external_id?: string;
	target?: string;
	date_created?: string | null;
	user_created?: DirectusUser | string | null;
	status?: string | null;
	url?: string | null;
	started_at?: string | null;
	completed_at?: string | null;
}

export interface Schema {
	block_about: BlockAbout[];
	block_about_files: BlockAboutFile[];
	block_button: BlockButton[];
	block_button_group: BlockButtonGroup[];
	block_doctors: BlockDoctor[];
	block_doctors_doctors: BlockDoctorsDoctor[];
	block_faq: BlockFaq[];
	block_faq_faq: BlockFaqFaq[];
	block_form: BlockForm[];
	block_hero: BlockHero[];
	block_map: BlockMap[];
	block_news: BlockNew[];
	block_photo_slider: BlockPhotoSlider[];
	block_photo_slider_files: BlockPhotoSliderFile[];
	block_promotions: BlockPromotion[];
	block_promotions_promotions: BlockPromotionsPromotion[];
	block_ratings: BlockRating[];
	block_reviews: BlockReview[];
	block_richtext: BlockRichtext[];
	block_services: BlockService[];
	categories: Category[];
	doctors: Doctor[];
	doctors_blocks: DoctorsBlock[];
	faq: Faq[];
	form_submissions: FormSubmission[];
	globals: Globals;
	navigation: Navigation[];
	navigation_items: NavigationItem[];
	news: New[];
	pages: Page[];
	pages_blocks: PagesBlock[];
	promotions: Promotion[];
	promotions_blocks: PromotionsBlock[];
	ratings: Rating[];
	reviews: Review[];
	services: Service[];
	services_blocks: ServicesBlock[];
	directus_access: DirectusAccess[];
	directus_activity: DirectusActivity[];
	directus_collections: DirectusCollection[];
	directus_comments: DirectusComment[];
	directus_fields: DirectusField[];
	directus_files: DirectusFile[];
	directus_folders: DirectusFolder[];
	directus_migrations: DirectusMigration[];
	directus_permissions: DirectusPermission[];
	directus_policies: DirectusPolicy[];
	directus_presets: DirectusPreset[];
	directus_relations: DirectusRelation[];
	directus_revisions: DirectusRevision[];
	directus_roles: DirectusRole[];
	directus_sessions: DirectusSession[];
	directus_settings: DirectusSettings;
	directus_users: DirectusUser[];
	directus_dashboards: DirectusDashboard[];
	directus_panels: DirectusPanel[];
	directus_notifications: DirectusNotification[];
	directus_shares: DirectusShare[];
	directus_flows: DirectusFlow[];
	directus_operations: DirectusOperation[];
	directus_translations: DirectusTranslation[];
	directus_versions: DirectusVersion[];
	directus_extensions: DirectusExtension[];
	directus_deployments: DirectusDeployment[];
	directus_deployment_projects: DirectusDeploymentProject[];
	directus_deployment_runs: DirectusDeploymentRun[];
}

export enum CollectionNames {
	block_about = 'block_about',
	block_about_files = 'block_about_files',
	block_button = 'block_button',
	block_button_group = 'block_button_group',
	block_doctors = 'block_doctors',
	block_doctors_doctors = 'block_doctors_doctors',
	block_faq = 'block_faq',
	block_faq_faq = 'block_faq_faq',
	block_form = 'block_form',
	block_hero = 'block_hero',
	block_map = 'block_map',
	block_news = 'block_news',
	block_photo_slider = 'block_photo_slider',
	block_photo_slider_files = 'block_photo_slider_files',
	block_promotions = 'block_promotions',
	block_promotions_promotions = 'block_promotions_promotions',
	block_ratings = 'block_ratings',
	block_reviews = 'block_reviews',
	block_richtext = 'block_richtext',
	block_services = 'block_services',
	categories = 'categories',
	doctors = 'doctors',
	doctors_blocks = 'doctors_blocks',
	faq = 'faq',
	form_submissions = 'form_submissions',
	globals = 'globals',
	navigation = 'navigation',
	navigation_items = 'navigation_items',
	news = 'news',
	pages = 'pages',
	pages_blocks = 'pages_blocks',
	promotions = 'promotions',
	promotions_blocks = 'promotions_blocks',
	ratings = 'ratings',
	reviews = 'reviews',
	services = 'services',
	services_blocks = 'services_blocks',
	directus_access = 'directus_access',
	directus_activity = 'directus_activity',
	directus_collections = 'directus_collections',
	directus_comments = 'directus_comments',
	directus_fields = 'directus_fields',
	directus_files = 'directus_files',
	directus_folders = 'directus_folders',
	directus_migrations = 'directus_migrations',
	directus_permissions = 'directus_permissions',
	directus_policies = 'directus_policies',
	directus_presets = 'directus_presets',
	directus_relations = 'directus_relations',
	directus_revisions = 'directus_revisions',
	directus_roles = 'directus_roles',
	directus_sessions = 'directus_sessions',
	directus_settings = 'directus_settings',
	directus_users = 'directus_users',
	directus_dashboards = 'directus_dashboards',
	directus_panels = 'directus_panels',
	directus_notifications = 'directus_notifications',
	directus_shares = 'directus_shares',
	directus_flows = 'directus_flows',
	directus_operations = 'directus_operations',
	directus_translations = 'directus_translations',
	directus_versions = 'directus_versions',
	directus_extensions = 'directus_extensions',
	directus_deployments = 'directus_deployments',
	directus_deployment_projects = 'directus_deployment_projects',
	directus_deployment_runs = 'directus_deployment_runs'
}