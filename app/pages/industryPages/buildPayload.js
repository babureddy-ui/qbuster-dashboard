/**
 * Builds the API payload for creating/updating an Industry Page from the
 * flat multi-step form state used in Create.jsx.
 */

/** Remove keys whose value is "", null or undefined. Keeps false/0/[]. */
function compact(obj) {
  const result = {};
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return;
    result[key] = value;
  });
  return result;
}

function buildMetaData(values) {
  return compact({
    title: values.title,
    description: values.description,
    canonical: values.canonical,
    alternate: values.alternate,
    ogTitle: values.ogTitle,
    ogDescription: values.ogDescription,
    ogImage: values.ogImage,
    ogUrl: values.ogUrl,
  });
}

/** Maps an image object (url/alt/width/height/top/left/bottom/right) to the payload shape. */
function buildImageEntry(image = {}) {
  return compact({
    src: image.url,
    alt: image.alt,
    width: image.width,
    height: image.height,
    top: image.top,
    left: image.left,
    bottom: image.bottom,
    right: image.right,
  });
}

/** Builds a { [`${prefix}${n}`]: imageEntry } map from an array of images. */
function buildImageMap(images, prefix) {
  const list = Array.isArray(images) ? images : [];
  const map = {};
  list.forEach((image, index) => {
    map[`${prefix}${index + 1}`] = buildImageEntry(image);
  });
  return map;
}

/**
 * Turns an array of form list-items into a keyed object (`{ [`${prefix}${n}`]: entry }`)
 * instead of a plain array, matching the API's expected shape for list-type sections.
 */
function buildEntryMap(list, prefix, mapItem) {
  const items = Array.isArray(list) ? list : [];
  const map = {};
  items.forEach((item, index) => {
    map[`${prefix}${index + 1}`] = mapItem(item, index);
  });
  return map;
}

function buildHeroSection(values) {
  return {
    firstTitle: values.titlePrimary || "",
    secondTitle: values.titleSecondary || "",
    description: values.heroDescription || "",
    images: {
      mainImage: buildImageEntry({
        url: values.centerImage,
        alt: values.imageAlt,
        width: values.imageWidth,
        height: values.imageHeight,
        top: values.imageTop,
        left: values.imageLeft,
        bottom: values.imageBottom,
        right: values.imageRight,
      }),
      ...buildImageMap(values.otherImages, "img"),
    },
  };
}

function buildFeaturesSection(features) {
  return buildEntryMap(features, "feature", (feature, index) =>
    compact({
      id: index + 1,
      image: feature.centerImage,
      alt: feature.imageAlt,
      icon: feature.icon,
      tag: feature.tag,
      title: feature.title,
      desc: feature.description,
      btnText: feature.btnText,
      backgroundCol: feature.backgroundCol,
      tagCol: feature.tagCol,
      imageWidth: feature.imageWidth,
      imageHeight: feature.imageHeight,
      ...buildImageMap(feature.otherImages, "Image"),
      points: (Array.isArray(feature.points) ? feature.points : []).filter(
        (point) => point && point.trim() !== ""
      ),
    })
  );
}

function buildOtherImpFeatures(items) {
  return buildEntryMap(items, "feature", (item) =>
    compact({
      image: item.image,
      tag: item.tag,
      title: item.title,
      desc: item.description,
    })
  );
}

function buildOutletTypes(items) {
  return buildEntryMap(items, "type", (item) =>
    compact({
      image: item.image,
      title: item.title,
      hoverColor: item.hoverColor,
    })
  );
}

function buildFaqs(items) {
  return buildEntryMap(items, "faq", (item) =>
    compact({
      question: item.question,
      answer: item.answer,
    })
  );
}

function buildCommonSections(commonSections) {
  const result = {};
  Object.entries(commonSections || {}).forEach(([key, value]) => {
    result[key] = Boolean(value);
  });
  return result;
}

export function buildIndustryPagePayload(values = {}) {
  return {
    page_name: values.pageName || "",
    route: values.route || "",
    location: values.location || "",
    meta_data: buildMetaData(values),
    hero_section: buildHeroSection(values),
    features_section: buildFeaturesSection(values.features),
    Other_Imp_features: buildOtherImpFeatures(values.otherImpFeatures),
    outlet_types: buildOutletTypes(values.outletTypes),
    faqs: buildFaqs(values.faqs),
    common_sections: buildCommonSections(values.commonSections),
  };
}

export default buildIndustryPagePayload;
