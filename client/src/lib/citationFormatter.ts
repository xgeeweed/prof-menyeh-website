export interface Publication {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
}

/**
 * Format a publication in APA 7th edition style
 */
export function formatAPA(pub: Publication): string {
  const authors = pub.authors;
  const year = pub.year;
  const title = pub.title;
  const journal = pub.journal || "";
  const volume = pub.volume || "";
  const pages = pub.pages || "";
  const doi = pub.doi || "";

  let citation = `${authors} (${year}). ${title}. `;
  
  if (journal) {
    citation += `*${journal}*`;
    if (volume) {
      citation += `, *${volume}*`;
    }
    if (pages) {
      citation += `, ${pages}`;
    }
    citation += ".";
  }
  
  if (doi) {
    citation += ` https://doi.org/${doi}`;
  }
  
  return citation;
}

/**
 * Format a publication in MLA 9th edition style
 */
export function formatMLA(pub: Publication): string {
  const authors = pub.authors;
  const title = pub.title;
  const journal = pub.journal || "";
  const volume = pub.volume || "";
  const year = pub.year;
  const pages = pub.pages || "";
  const doi = pub.doi || "";

  let citation = `${authors}. "${title}." `;
  
  if (journal) {
    citation += `*${journal}*`;
    if (volume) {
      citation += `, vol. ${volume}`;
    }
    citation += `, ${year}`;
    if (pages) {
      citation += `, pp. ${pages}`;
    }
    citation += ".";
  }
  
  if (doi) {
    citation += ` doi:${doi}`;
  }
  
  return citation;
}

/**
 * Format a publication in Chicago 17th edition style (Notes and Bibliography)
 */
export function formatChicago(pub: Publication): string {
  const authors = pub.authors;
  const title = pub.title;
  const journal = pub.journal || "";
  const volume = pub.volume || "";
  const year = pub.year;
  const pages = pub.pages || "";
  const doi = pub.doi || "";

  let citation = `${authors}. "${title}." `;
  
  if (journal) {
    citation += `*${journal}*`;
    if (volume) {
      citation += ` ${volume}`;
    }
    citation += ` (${year})`;
    if (pages) {
      citation += `: ${pages}`;
    }
    citation += ".";
  }
  
  if (doi) {
    citation += ` https://doi.org/${doi}`;
  }
  
  return citation;
}

/**
 * Format a publication in BibTeX format
 */
export function formatBibTeX(pub: Publication): string {
  const firstAuthor = pub.authors.split(",")[0].trim().replace(/\s+/g, "");
  const key = `${firstAuthor}${pub.year}`;
  
  let bibtex = `@article{${key},\n`;
  bibtex += `  author = {${pub.authors}},\n`;
  bibtex += `  title = {${pub.title}},\n`;
  bibtex += `  year = {${pub.year}}`;
  
  if (pub.journal) {
    bibtex += `,\n  journal = {${pub.journal}}`;
  }
  if (pub.volume) {
    bibtex += `,\n  volume = {${pub.volume}}`;
  }
  if (pub.pages) {
    bibtex += `,\n  pages = {${pub.pages}}`;
  }
  if (pub.doi) {
    bibtex += `,\n  doi = {${pub.doi}}`;
  }
  
  bibtex += `\n}`;
  
  return bibtex;
}
