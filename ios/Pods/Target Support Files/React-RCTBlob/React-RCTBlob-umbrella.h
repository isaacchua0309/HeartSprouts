#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "RCTBlob/RCTBlobCollector.h"
#import "RCTBlob/RCTBlobManager.h"
#import "RCTBlob/RCTBlobPlugins.h"
#import "RCTBlob/RCTFileReaderModule.h"

FOUNDATION_EXPORT double RCTBlobVersionNumber;
FOUNDATION_EXPORT const unsigned char RCTBlobVersionString[];

