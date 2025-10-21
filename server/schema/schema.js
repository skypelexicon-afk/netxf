import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  pgEnum,
  boolean,
  jsonb,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { One, sql } from "drizzle-orm";

// Enums
export const roles = pgEnum("role", ["super_admin", "educator", "student", "staff"]);
export const contentTypeEnum = pgEnum("content_type", ["attachment", "video", "code_file"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "processed", "canceled"]);

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  phone: varchar("phone", { length: 13 }).notNull(),
  address: text("address").notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  university: text("university").notNull(),
  role: roles("role").notNull(),

  refresh_token: text("refresh_token"),
  secret_user: text("secret_user").notNull().default(""),
  is_verified: boolean("is_verified").default(false),
  verification_code: text("verification_code"),

  is_logged_in: boolean("is_logged_in").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  target: text("target").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  educatorName: text("educator_name"),
  educatorImage: text("educator_image"),
  demoVideos: text("demo_videos").array(),
  is_active: boolean("is_active").default(true),

  contents: text("contents").array().notNull().default(sql`ARRAY[]::text[]`),
  faqs: jsonb("faqs").notNull().default(sql`'[]'::jsonb`),

  originalPrice: integer("original_price").notNull(),
  discountLabel: text("discount_label").notNull(),
  educator_id: integer("educator_id").notNull().references(() => users.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});


// Sections
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),//attachment, video, code_file
  // type: contentTypeEnum("type").notNull(),
  // file_url: text("file_url").notNull(),
  course_id: integer("course_id").notNull().references(() => courses.id),
  order: integer("order").notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Sub-sections
export const subSections = pgTable("sub_sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  file_url: text("file_url").notNull(),
  type: contentTypeEnum("type").notNull(),
  duration: text("duration"),
  section_id: integer("section_id").notNull().references(() => sections.id),
  order: integer("order").notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
// Free PDFs
export const freePdf = pgTable("freePdfs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  file_url: text("file_url").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
})
// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  transaction_id: text("transaction_id").notNull(), // Generated during payment
  user_id: integer("user_id").notNull().references(() => users.id),
  // course_id: integer("course_id").references(() => courses.id),
  // bundle_id: integer("bundle_id").references(() => bundles.id),
  // cart_id: integer("cart_id").references(() => cart.id),
  // orderItems_id: integer("order_items_id").references(() => orderItems.id),
  status: orderStatusEnum("status").notNull(),
  order_amount: doublePrecision("order_amount").notNull(),
  tax_amount: doublePrecision("tax_amount").notNull(),
  discount_amount: doublePrecision("discount_amount").notNull(),
  invoice_num: text("invoice_num"),
  net_amount: doublePrecision("net_amount").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  course_id: integer("course_id").references(() => courses.id),
  bundle_id: integer("bundle_id").references(() => bundles.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
})
// Coupons
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  coupon_code: text("coupon_code").notNull(),
  discount: integer("discount").notNull(),
  max_availability: integer("max_availability").notNull(),
  course_id: integer("course_id").references(() => courses.id),
  bundle_id: integer("bundle_id").references(() => bundles.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  course_id: integer("course_id").notNull().references(() => courses.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  isApproved: boolean("is_approved").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Forum
export const forums = pgTable("forums", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  comment: text("comment").notNull(),
  upload: text("upload"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// FAQs
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),


  course_id: integer("course_id").notNull().references(() => courses.id),
  educator_id: integer("educator_id").notNull().references(() => users.id),

  question: text("question").notNull(),
  answer: text("answer").notNull(),
  approved: boolean("approved").default(false),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  course_id: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  pinned: boolean("pinned").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const bundles = pgTable("bundles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  hero_image: text("hero_image"),

  bundle_price: integer("bundle_price").notNull(),
  original_price: integer("original_price").notNull(),
  discount_label: text("discount_label"),

  educator_id: integer("educator_id").notNull().references(() => users.id),

  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const bundleCourses = pgTable("bundle_courses", {
  id: serial("id").primaryKey(),
  bundle_id: integer("bundle_id").notNull().references(() => bundles.id, { onDelete: "cascade" }),
  course_id: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  added_at: timestamp("added_at").notNull().defaultNow(),
});

export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  added_at: timestamp("added_at").notNull().defaultNow(),
});

export const cartCourses = pgTable("cart_courses", {
  id: serial("id").primaryKey(),
  cart_id: integer("cart_id").notNull().references(() => cart.id, { onDelete: "cascade" }),
  course_id: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  added_at: timestamp("added_at").notNull().defaultNow(),
});

// Subsection Progress
export const subsectionProgress = pgTable("subsection_progress", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subsection_id: integer("subsection_id").notNull().references(() => subSections.id, { onDelete: "cascade" }),
  is_completed: boolean("is_completed").notNull().default(false),
  completed_at: timestamp("completed_at"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Relations ////////////////////////////////////////////////////////////////////////
import { relations } from "drizzle-orm";

export const courseRelations = relations(courses, ({ many }) => ({
  sections: many(sections),
  faqs: many(faqs, {
    fields: [faqs.course_id],
    references: [courses.id],
  }),
  announcements: many(announcements, {
    fields: [announcements.course_id],
    references: [courses.id],
  }),
  bundleCourses: many(bundleCourses),
  cartCourses: many(cartCourses),
}));

export const sectionRelations = relations(sections, ({ many, one }) => ({
  course: one(courses, {
    fields: [sections.course_id],
    references: [courses.id],
  }),
  subSections: many(subSections),
}));

export const subSectionRelations = relations(subSections, ({ one }) => ({
  section: one(sections, {
    fields: [subSections.section_id],
    references: [sections.id],
  }),
}));

export const faqRelations = relations(faqs, ({ one }) => ({
  course: one(courses, {
    fields: [faqs.course_id],
    references: [courses.id],
  })
}))

export const announcementRelations = relations(announcements, ({ one }) => ({
  course: one(courses, {
    fields: [announcements.course_id],
    references: [courses.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  
  orders: many(orders, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  reviews: many(reviews, {
    fields: [reviews.user_id],
    references: [users.id],
  }),
  forums: many(forums, {
    fields: [forums.user_id],
    references: [users.id],
  }),
  carts: many(cart, {
    fields: [cart.user_id],
    references: [users.id],
  }),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  orderItems: many(orderItems, {
    fields: [orders.id], // this is the key correction
    references: [orderItems.order_id],
  }),
}));


export const bundleCoursesRelations = relations(bundleCourses, ({ one }) => ({
  bundle: one(bundles, {
    fields: [bundleCourses.bundle_id],
    references: [bundles.id],
  }),
  course: one(courses, {
    fields: [bundleCourses.course_id],
    references: [courses.id],
  }),
}));

export const bundleRelations = relations(bundles, ({ many }) => ({
  bundleCourses: many(bundleCourses),
}));

export const cartRelations = relations(cart, ({ one,many }) => ({
  user: one(users, {
    fields: [cart.user_id],
    references: [users.id],
  }),
  cartCourses: many(cartCourses, {
    fields: [cartCourses.cart_id],
    references: [cart.id],
  }),
}))

export const cartCoursesRelations = relations(cartCourses, ({ one }) => ({
  cart: one(cart, {
    fields: [cartCourses.cart_id],
    references: [cart.id],
  }),
  course: one(courses, {
    fields: [cartCourses.course_id],
    references: [courses.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  course: one(courses, {
    fields: [orderItems.course_id],
    references: [courses.id],
  }),
  bundle: one(bundles, {
    fields: [orderItems.bundle_id],
    references: [bundles.id],
  }),
}));

export const subsectionProgressRelations = relations(subsectionProgress, ({ one }) => ({
  user: one(users, {
    fields: [subsectionProgress.user_id],
    references: [users.id],
  }),
  subsection: one(subSections, {
    fields: [subsectionProgress.subsection_id],
    references: [subSections.id],
  }),
}));