export const Slug = (slug) => {

    let index = slug.lastIndexOf("-") + 1;
    if (slug.length > index)
    {
        slug = slug.substr(index);
        return slug;
    }

    return null;
};