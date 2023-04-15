import { useState, useEffect } from "react";

/**
 * Parses a CSV/XLSX file into a JSON object
 * @param file File object from HTML5 File API
 * @returns A JSON object representing the CSV/XLSX file
 */
const useCsvToJson = (file: File) => {
  const [json, setJson] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    const csvToJson = (csvFile: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const dataAsText = reader.result;

        if (typeof dataAsText === "string") {
          const rows = dataAsText.replace(/\r+/g, "").split("\n");
          const headers = rows.shift()?.split(",");
          const results = [];

          if (!headers) return;

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(",");
            const returnJson: Record<string, any> = {};

            for (let j = 0; j < headers.length; j++) {
              const header = headers[j];
              const value = row[j];

              returnJson[header] = value;
            }
            results.push(returnJson);
          }

          setJson(results);
        }
      };
      if (csvFile) {
        reader.readAsText(csvFile);
      }
    };

    csvToJson(file);
  }, [file]);

  return json;
};

export default useCsvToJson;
