"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import LoadingOverlay from "./LoadingOverlay";

const formSchema = z.object({
  pdf: z.instanceof(File, { message: "Please upload a PDF file" }),
  coverImage: z
    .instanceof(File, { message: "Please upload a cover image" })
    .optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  author: z
    .string()
    .min(1, "Author name is required")
    .max(200, "Author name must be less than 200 characters"),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"], {
    message: "Please select a voice",
  }),
});

type FormData = z.infer<typeof formSchema>;

const voices = [
  {
    id: "dave",
    name: "Dave",
    gender: "male",
    description: "Young male, British-Essex, casual & conversational",
  },
  {
    id: "daniel",
    name: "Daniel",
    gender: "male",
    description: "Middle-aged male, British, authoritative but warm",
  },
  {
    id: "chris",
    name: "Chris",
    gender: "male",
    description: "Male, casual & easy-going",
  },
  {
    id: "rachel",
    name: "Rachel",
    gender: "female",
    description: "Young female, American, calm & clear",
  },
  {
    id: "sarah",
    name: "Sarah",
    gender: "female",
    description: "Young female, American, soft & approachable",
  },
];

const UploadForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voice: "rachel",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedVoice = watch("voice");

  const handlePdfDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setValue("pdf", file);
    }
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImageFile(file);
      setValue("coverImage", file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setValue("pdf", file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setValue("coverImage", file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const removeCover = () => {
    setCoverImageFile(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual form submission logic
      // This would typically send the form data to a server endpoint
      console.log("Form data:", data);

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Reset form after successful submission
      setPdfFile(null);
      setCoverImageFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        isVisible={isLoading}
        message="Preparing your book for synthesis..."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="new-book-wrapper">
        {/* PDF Upload */}
        <div>
          <div className="bg-[#f3e4c7] -mx-6 px-6 py-3">
            <label htmlFor="pdf" className="form-label !m-0">
              Book PDF File
            </label>
          </div>
          <div className="pt-4">
            <input
              ref={pdfInputRef}
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handlePdfChange}
              className="hidden"
            />

            {!pdfFile ? (
              <div
                onClick={() => pdfInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handlePdfDrop}
                className="upload-dropzone"
              >
                <Upload className="upload-dropzone-icon" />
                <p className="upload-dropzone-text">Click to upload PDF</p>
                <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
              </div>
            ) : (
              <div className="upload-dropzone upload-dropzone-uploaded">
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-3">
                    <Upload className="upload-dropzone-icon" />
                    <div>
                      <p className="upload-dropzone-text text-left">
                        {pdfFile.name}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePdf}
                    className="upload-dropzone-remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {errors.pdf && (
              <p className="text-red-500 text-sm mt-2">{errors.pdf.message}</p>
            )}
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
          <div className="bg-[#f3e4c7] -mx-6 px-6 py-3">
            <label htmlFor="coverImage" className="form-label !m-0">
              Cover Image (Optional)
            </label>
          </div>
          <div className="pt-4">
            <input
              ref={coverInputRef}
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />

            {!coverImageFile ? (
              <div
                onClick={() => coverInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleCoverDrop}
                className="upload-dropzone"
              >
                <ImageIcon className="upload-dropzone-icon" />
                <p className="upload-dropzone-text">
                  Click to upload cover image
                </p>
                <p className="upload-dropzone-hint">
                  Leave empty to auto-generate from PDF
                </p>
              </div>
            ) : (
              <div className="upload-dropzone upload-dropzone-uploaded">
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="upload-dropzone-icon" />
                    <div>
                      <p className="upload-dropzone-text text-left">
                        {coverImageFile.name}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCover}
                    className="upload-dropzone-remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-2">
                {errors.coverImage.message}
              </p>
            )}
          </div>
        </div>

        {/* Title Input */}
        <div>
          <div className="bg-[#f3e4c7] -mx-6 px-6 py-3">
            <label htmlFor="title" className="form-label !m-0">
              Title
            </label>
          </div>
          <div className="pt-4">
            <input
              id="title"
              type="text"
              placeholder="ex: Rich Dad Poor Dad"
              className="form-input"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        {/* Author Input */}
        <div>
          <div className="bg-[#f3e4c7] -mx-6 px-6 py-3">
            <label htmlFor="author" className="form-label !m-0">
              Author Name
            </label>
          </div>
          <div className="pt-4">
            <input
              id="author"
              type="text"
              placeholder="ex: Robert Kiyosaki"
              className="form-input"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-2">
                {errors.author.message}
              </p>
            )}
          </div>
        </div>

        {/* Voice Selector */}
        <div>
          <div className="bg-[#f3e4c7] -mx-6 px-6 py-3">
            <label className="form-label !m-0">Choose Assistant Voice</label>
          </div>
          <div className="pt-4">
            <div className="space-y-5">
              {/* Male Voices */}
              <div>
                <h3 className="text-sm font-medium text-[#666] mb-3">
                  Male Voices
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {voices
                    .filter((v) => v.gender === "male")
                    .map((voice) => (
                      <label
                        key={voice.id}
                        className={`voice-selector-option ${
                          selectedVoice === voice.id
                            ? "voice-selector-option-selected border-2 border-[#663820]"
                            : "voice-selector-option-default"
                        }`}
                      >
                        <input
                          type="radio"
                          value={voice.id}
                          className="hidden"
                          {...register("voice")}
                        />
                        <div className="flex items-start gap-2.5 w-full">
                          <input
                            type="radio"
                            checked={selectedVoice === voice.id}
                            readOnly
                            className="mt-1 cursor-pointer"
                            tabIndex={-1}
                          />
                          <div className="text-left flex-1 min-w-0">
                            <p className="font-semibold text-[#212a3b] text-sm leading-tight">
                              {voice.name}
                            </p>
                            <p className="text-xs text-[#999] line-clamp-2 leading-tight mt-0.5">
                              {voice.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>

              {/* Female Voices */}
              <div>
                <h3 className="text-sm font-medium text-[#666] mb-3">
                  Female Voices
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {voices
                    .filter((v) => v.gender === "female")
                    .map((voice) => (
                      <label
                        key={voice.id}
                        className={`voice-selector-option ${
                          selectedVoice === voice.id
                            ? "voice-selector-option-selected border-2 border-[#663820]"
                            : "voice-selector-option-default"
                        }`}
                      >
                        <input
                          type="radio"
                          value={voice.id}
                          className="hidden"
                          {...register("voice")}
                        />
                        <div className="flex items-start gap-2.5 w-full">
                          <input
                            type="radio"
                            checked={selectedVoice === voice.id}
                            readOnly
                            className="mt-1 cursor-pointer"
                            tabIndex={-1}
                          />
                          <div className="text-left flex-1 min-w-0">
                            <p className="font-semibold text-[#212a3b] text-sm leading-tight">
                              {voice.name}
                            </p>
                            <p className="text-xs text-[#999] line-clamp-2 leading-tight mt-0.5">
                              {voice.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
            </div>

            {errors.voice && (
              <p className="text-red-500 text-sm mt-3">
                {errors.voice.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className="form-btn">
          Begin Synthesis
        </button>
      </form>
    </>
  );
};

export default UploadForm;
